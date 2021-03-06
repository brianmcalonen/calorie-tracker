// ////////////////////////////////////////////////////////////////////////////
// // STORAGE CONTROLLER

// const StorageCtrl = (function () {

//     // Public Methods
//     return {
//         storeItem: function (item) {
//             let items;

//             // Check to see if items in localStorage
//             if (localStorage.getItem('items') === null) {
//                 // Set items to an empty array
//                 items = [];
//                 // Push new item to array
//                 items.push(item);
//                 // Set localStorage(can only hold strings by default)
//                 localStorage.setItem('items', JSON.stringify(items));
//             } else {
//                 // Get items from localStorage & return items as objects
//                 items = JSON.parse(localStorage.getItem('items'));
//                 // Push new item
//                 items.push(item);
//                 // Reset localStorage
//                 localStorage.setItem('items', JSON.stringify(items));
//             }
//         },
//         getItemsFromStorage: function () {
//             let items;

//             // Check if there are any items in localStorage
//             if (localStorage.getItem('items') === null) {
//                 // If nothing there, set items to empty array
//                 items = [];
//             } else {
//                 items = JSON.parse(localStorage.getItem("items"))
//             }
//             return items;
//         }
//     }
// })();

// ////////////////////////////////////////////////////////////////////////////
// // ITEM CONTROLLER

// const ItemCtrl = (function () {
//     // Item Constructor
//     const Item = function (id, name, calories) {
//         this.id = id;
//         this.name = name;
//         this.calories = calories;
//     }

//     // Data Structure || State
//     const data = {
//         // items: [
//         //     // { id: 0, name: "Veggie Lasagna", calories: 1200 },
//         //     // { id: 1, name: "Eggs Benedict", calories: 700 },
//         //     // { id: 2, name: "Tuna Tartar", calories: 450 }
//         // ],
//         items: StorageCtrl.getItemsFromStorage(),
//         currentItem: null,
//         totalCalories: 0
//     }

//     // Public Methods
//     return {
//         getItems: function () {
//             return data.items;
//         },
//         addItem: function (name, calories) {
//             let ID;
//             // Create ID
//             if (data.items.length > 0) {
//                 ID = data.items[data.items.length - 1].id + 1;
//             } else {
//                 ID = 0;
//             }

//             // Calories from string to number
//             calories = parseInt(calories);

//             // Create new item
//             newItem = new Item(ID, name, calories);

//             // Add new item to array
//             data.items.push(newItem);

//             return newItem;
//         },
//         logData: function () {
//             return data;
//         },
//         getItembyId: function (id) {
//             let found = null;
//             // Loop through items
//             data.items.forEach(item => {
//                 if (item.id === id) {
//                     found = item;
//                 }
//             });
//             return found;
//         },
//         updateItem: function (name, calories) {
//             // Calories to number
//             calories = parseInt(calories);

//             let found = null;

//             data.items.forEach(function (item) {
//                 if (item.id === data.currentItem.id) {
//                     item.name = name;
//                     item.calories = calories;
//                     found = item;
//                 }
//             });
//             return found;
//         },
//         deleteItem: function (id) {
//             // Get ids
//             const ids = data.items.map(item => item.id);

//             // Get index
//             const index = ids.indexOf(id);

//             // Remove item
//             data.items.splice(index, 1);
//         },
//         clearAllItems: function () {
//             data.items = [];
//         },
//         setCurrentItem: function (item) {
//             data.currentItem = item;
//         },
//         getCurrentItem: function () {
//             return data.currentItem;
//         },
//         getTotalCalories: function () {
//             let total = 0;

//             // Loop through items and add calories
//             data.items.forEach(function (item) {
//                 total += item.calories
//             });

//             // Set total calories in data
//             data.totalCalories = total;

//             // Return total
//             return data.totalCalories;
//         }
//     }
// })();

// ////////////////////////////////////////////////////////////////////////////
// // UI CONTROLLER

// const UICtrl = (function () {
//     // UI Selectors
//     const UISelectors = {
//         itemList: "#item-list",
//         listItems: "#item-list li",
//         addBtn: ".add-btn",
//         clearBtn: ".clear-btn",
//         updateBtn: ".update-btn",
//         deleteBtn: ".delete-btn",
//         backBtn: ".back-btn",
//         itemNameInput: "#item-name",
//         itemCaloriesInput: "#item-calories",
//         totalCalories: ".total-calories"
//     }

//     // Public Methods
//     return {
//         populateItemList: function (items) {
//             let html = "";

//             items.forEach(function (item) {
//                 html += `            
//                 <li class="collection-item" id="item-${item.id}">
//                     <strong>${item.name}: </strong> 
//                     <em>${item.calories} Calories</em>
//                     <a href="#" class="secondary-content">
//                     <i class="edit-item fa fa-pencil"></i>
//                     </a>
//                 </li>`
//             });

//             document.querySelector(UISelectors.itemList).innerHTML = html;
//         },
//         addListItem: function (item) {
//             // Create li element
//             const li = document.createElement('li');
//             // Add class
//             li.className = "collection-item";
//             // Add ID
//             li.id = `item-${item.id}`;
//             // Add HTML
//             li.innerHTML =
//                 `<strong>${item.name}: </strong> 
//                 <em>${item.calories} Calories</em>
//                 <a href="#" class="secondary-content">
//                 <i class="edit-item fa fa-pencil"></i>
//                 </a>`
//             // Insert item
//             document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);

//         },
//         updateListItem: function (item) {
//             let listItems = document.querySelectorAll(UISelectors.listItems);

//             // Convert Node list into array
//             listItems = Array.from(listItems);

//             listItems.forEach(function (listItem) {
//                 const itemID = listItem.getAttribute("id");

//                 if (itemID === `item-${item.id}`) {
//                     document.querySelector(`#${itemID}`).innerHTML =
//                         `<strong>${item.name}: </strong> 
//                         <em>${item.calories} Calories</em>
//                         <a href="#" class="secondary-content">
//                         <i class="edit-item fa fa-pencil"></i>
//                         </a>`
//                 }
//             });
//         },
//         deleteListItem: function (id) {
//             const itemID = `#item-${id}`;

//             const item = document.querySelector(itemID);

//             item.remove();
//         },

//         getItemInput: function () {
//             return {
//                 name: document.querySelector(UISelectors.itemNameInput).value,
//                 calories: document.querySelector(UISelectors.itemCaloriesInput).value
//             }
//         },
//         getSelectors: function () {
//             return UISelectors;
//         },
//         removeItems: function () {
//             let listItems = document.querySelectorAll(UISelectors.listItems);

//             // Conver Node list into array
//             listItems = Array.from(listItems);

//             // Remove each item from array
//             listItems.forEach(item => item.remove());
//         },
//         showTotalCalories: function (totalCalories) {
//             document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
//         },
//         clearFields: function () {
//             document.querySelector(UISelectors.itemNameInput).value = "";
//             document.querySelector(UISelectors.itemCaloriesInput).value = "";
//         },
//         addItemToForm: function () {
//             document.querySelector(UISelectors.itemNameInput).value =
//                 ItemCtrl.getCurrentItem().name;
//             document.querySelector(UISelectors.itemCaloriesInput).value =
//                 ItemCtrl.getCurrentItem().calories;
//             UICtrl.showEditState();
//         },
//         clearEditState: function () {
//             // Call the clearFields function
//             UICtrl.clearFields();
//             // Hide other buttons
//             document.querySelector(UISelectors.updateBtn).style.display = "none";
//             document.querySelector(UISelectors.deleteBtn).style.display = "none";
//             document.querySelector(UISelectors.backBtn).style.display = "none";
//             document.querySelector(UISelectors.addBtn).style.display = "inline";
//         },
//         showEditState: function () {
//             document.querySelector(UISelectors.updateBtn).style.display = "inline";
//             document.querySelector(UISelectors.deleteBtn).style.display = "inline";
//             document.querySelector(UISelectors.backBtn).style.display = "inline";
//             document.querySelector(UISelectors.addBtn).style.display = "none";
//         }

//     }
// })();

////////////////////////////////////////////////////////////////////////////
// APP CONTROLLER

const AppCtrl = (function (StorageCtrl, ItemCtrl, UICtrl) {
    // Load Event Listeners
    const loadEventListeners = function () {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        })

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

        // Update icon  event
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener("click",
            UICtrl.clearEditState);

        // Clear all items event
        document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItemsClick);
    }

    // Add Item Submit
    const itemAddSubmit = function (e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== "" && input.calories !== "") {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI List
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in localStorage
            StorageCtrl.storeItem(newItem);

            // Clear fields
            UICtrl.clearFields();
        }

        e.preventDefault()
    }

    // Item edit click
    const itemEditClick = function (e) {
        if (e.target.classList.contains("edit-item")) {
            // Get list item id (item-1, item-2, etc...)
            // Only if the edit item is clicked
            const listId = e.target.parentNode.parentNode.id;

            // Break into the array
            const listIdArr = listId.split('-');

            // Get the actual id
            const id = parseInt(listIdArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItembyId(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }


        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = e => {
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update localStorage
        StorageCtrl.updateItemStorage(updatedItem);

        // Clear fields
        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Delete button event
    const itemDeleteSubmit = function (e) {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete from localStorage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        // Clear edit state
        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Clear items event
    const clearAllItemsClick = function (e) {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Remove all items from UI
        UICtrl.removeItems();

        // Clear from localStorage
        StorageCtrl.clearItemsFromStorage();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
    }

    // Public Methods
    return {
        init: function () {
            // Clear edit state / set initial state
            UICtrl.clearEditState();

            // Fetch items from data object
            const items = ItemCtrl.getItems();

            // Populate list with items
            UICtrl.populateItemList(items);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners()
        }
    }
})(StorageCtrl, ItemCtrl, UICtrl);

////////////////////////////////////////////////////////////////////////////
// INITIALIZE APP
AppCtrl.init()