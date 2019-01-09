////////////////////////////////////////////////////////////////////////////
// STORAGE CONTROLLER

const StorageCtrl = (function () {

    // Public Methods
    return {
        storeItem: function (item) {
            let items;

            // Check to see if items in localStorage
            if (localStorage.getItem('items') === null) {
                // Set items to an empty array
                items = [];
                // Push new item to array
                items.push(item);
                // Set localStorage(can only hold strings by default)
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get items from localStorage & return items as objects
                items = JSON.parse(localStorage.getItem('items'));
                // Push new item
                items.push(item);
                // Reset localStorage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function () {
            let items;

            // Check if there are any items in localStorage
            if (localStorage.getItem('items') === null) {
                // If nothing there, set items to empty array
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem("items"))
            }

            return items;
        },
        updateItemStorage: function (updatedItem) {
            // Get items from localStorage            
            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach(function (item, index) {
                if (updatedItem.id === item.id) {
                    // Remove that item & replace with updated item
                    items.splice(index, 1, updatedItem);

                }
            });

            // Reset localStorage
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function (id) {
            // Get items from localStorage
            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach(function (item, index) {
                if (id === item.id) {
                    // Remove that item
                    items.splice(index, 1);

                }
            });

            // Reset localStorage
            localStorage.setItem('items', JSON.stringify(items));

        },
        clearItemsFromStorage: function () {
            localStorage.removeItem('items');
        }
    }
})();