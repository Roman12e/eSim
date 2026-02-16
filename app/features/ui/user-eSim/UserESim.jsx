import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../hooks/useUser";

import PorgressBarUsage from "../../../shared/ui/ProgressBarUsage/ProgressBarUsage";
import SimStatusLabel from "../../../shared/ui/SimStatusLabel/SimStatusLabel";

function daysLeft(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    const targetDate = new Date(year, month - 1, day);
    const today = new Date();

    // обнуляем время
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today; // разница в миллисекундах
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // в днях

    return diffDays;
}

function subtractMonth(dateStr) {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    // вычитаем один месяц
    date.setMonth(date.getMonth() - 1);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatted = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return formatted;
}

export default function UserESim({ data, country, idx }) {
    const navigation = useNavigation();
    const { user } = useUser();

    if (!data?.simcardDetails?.data_credit_details) return null;

    const status = data.simcardDetails.simcard_status;
    const iccid = data.simcardDetails.iccid;
    const installLink = data.simcardDetails?.ios_universal_installation_link;
    const qrcode = data.simcardDetails?.qr_code_image;

    const isInstall = user?.sims[idx]?.isInstall;

    const creditDetails =
        data?.simcardDetails?.data_credit_details?.[country];

    const sim =
        creditDetails && typeof creditDetails === "object"
            ? Object.values(creditDetails)[0]
            : null;

    if (!sim || !qrcode) return null;

    const iso2 = sim.iso;
    const region = sim.region;
    const totalMb = Number(sim.data_total);
    const remainingMb = Number(sim.remaining_mb);
    const usedMb = (totalMb - remainingMb).toFixed(2);

    const duration = sim.product?.duration;
    const volumeLabel = sim.product?.formatted_volume;
    const next_renewal = sim.product?.next_renewal_label;
    const days_left = daysLeft(sim.product?.next_renewal_label);
    const purchase_date = subtractMonth(sim.product?.next_month);

    const remainingPercent = Math.round((remainingMb * 100) / totalMb);
    const barColor = remainingPercent > 30 ? "#19b683" : "#d55860";

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ESimInfo/ESimInfo",
                {
                    country: region,
                    status: status,
                    iso2: iso2,
                    totalMb: totalMb,
                    remainingMb: remainingMb,
                    usedMb: usedMb,
                    next_renewal: next_renewal,
                    iccid: iccid,
                    days_left: days_left,
                    purchase_date: purchase_date,
                    isInstall: isInstall,
                    installLink: installLink,
                    qrcode: qrcode,
                    barColor: barColor,
                })}
            style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <CountryFlag isoCode={iso2} size={30} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>{region}</Text>
                        <Text style={{ fontSize: 15, color: '#68676d' }}>{volumeLabel}</Text>
                    </View>
                </View>
                <SimStatusLabel status={status} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: '#68676d' }}>Data Usage</Text>
                <Text style={{ color: '#68676d' }}>{usedMb} MB / {volumeLabel} GB</Text>
            </View>
            <PorgressBarUsage usedData={usedMb} totalData={totalMb} color={barColor} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <Feather name="calendar" size={16} color="#9e9fa4" />
                    <Text style={{ color: '#68676d' }}>{duration} days</Text>
                </View>
                <Feather name="arrow-right" size={20} color="#9e9fa4" />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f8faf9',
        borderRadius: 20,
        marginTop: 20
    }
})