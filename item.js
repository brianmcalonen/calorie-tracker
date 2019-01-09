////////////////////////////////////////////////////////////////////////////
// ITEM CONTROLLER

const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure || State
    const data = {
        // items: [
        //     // { id: 0, name: "Veggie Lasagna", calories: 1200 },
        //     // { id: 1, name: "Eggs Benedict", calories: 700 },
        //     // { id: 2, name: "Tuna Tartar", calories: 450 }
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories from string to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add new item to array
            data.items.push(newItem);

            return newItem;
        },
        logData: function () {
            return data;
        },
        getItembyId: function (id) {
            let found = null;
            // Loop through items
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function (name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function (id) {
            // Get ids
            const ids = data.items.map(item => item.id);

            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function () {
            data.items = [];
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        getTotalCalories: function () {
            let total = 0;

            // Loop through items and add calories
            data.items.forEach(function (item) {
                total += item.calories
            });

            // Set total calories in data
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
        }
    }
})();