interface KeyValueItem {
    active: boolean;
    key: string;
    value: string;
}

interface ItemChange {
    index: number;
    item: KeyValueItem;
}

export {
    KeyValueItem,
    ItemChange,
};