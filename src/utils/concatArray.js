export function concateArray (items) {
    delete items['total_pages'];
    delete items['current_selected_page'];
    delete items['all_records_count'];
    let arr = [];
    for (let keys in items) {
        arr.push(...items[keys]);
    }
    return arr;
}