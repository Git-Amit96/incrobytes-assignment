const data = require('./data.json');

const cat_map = {};
const sub_map = {}

for (const category of data.categories) {
    // Insert into Mondgo db category.name
    cat_map[category.name] = 'id'; // category_id
    for (const subcategory of category.sub_categories) {
        // insert into mongo db -_ cat_map[category.name], subcategory.name
        sub_map[`${category.name}_${subcategory.name}`] = 'id' //subcategory_id
        for (const product of subcategory.products) {
            // Insert product
        }
    }

}