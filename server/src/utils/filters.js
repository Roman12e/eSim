export function filterPlans(data) {
    const hiddenPlans = process.env.HIDE_PLANS?.split(",") || [];
    const minVolume = Number(process.env.MIN_VOLUME_MB || 0);
    const hideUnlimited = process.env.HIDE_UNLIMITED === "true";
    const extraCharge = Number(process.env.EXTRA_CHARGE || 1);

    return data
        .filter(item => {
            if (hiddenPlans.includes(item.sku)) return false;
            if (item.volume < minVolume) return false;
            if (hideUnlimited && item.unlimited === 1) return false;
            return true;
        })
        .map(item => ({
            ...item,
            price: (item.price * extraCharge).toFixed(2)
        }));
}