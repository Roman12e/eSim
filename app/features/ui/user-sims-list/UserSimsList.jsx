import { View } from "react-native";

import ProgressBarUsage from "../../../shared/ui/ProgressBarUsage/ProgressBarUsage";
import SimStatusLabel from "../../../shared/ui/SimStatusLabel/SimStatusLabel";


export default function UserSimsList() {
    return (
        <View>
            <SimStatusLabel status={"Active"} />
            <ProgressBarUsage status={"Active"} usedData={754} totalData={3 * 1024} />
        </View>
    );
}