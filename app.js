////////////////////////////////////////////////////////////////////////////
// STORAGE CONTROLLER

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
        items: [
            // { id: 0, name: "Veggie Lasagna", calories: 1200 },
            // { id: 1, name: "Eggs Benedict", calories: 700 },
            // { id: 2, name: "Tuna Tartar", calories: 450 }
        ],
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
        }
    }
})();

////////////////////////////////////////////////////////////////////////////
// UI CONTROLLER

const UICtrl = (function () {
    // UI Selectors
    const UISelectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories"
    }

    // Public Methods
    return {
        populateItemList: function (items) {
            let html = "";

            items.forEach(function (item) {
                html += `            
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> 
                    <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        addListItem: function (item) {
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = "collection-item";
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `                    <strong>${item.name}: </strong> 
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);

        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        getSelectors: function () {
            return UISelectors;
        },
        clearFields: function () {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        }

    }
})();

////////////////////////////////////////////////////////////////////////////
// APP CONTROLLER

const AppCtrl = (function (ItemCtrl, UICtrl) {
    // Load Event Listeners
    const loadEventListeners = function () {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn)
            .addEventListener("click", itemAddSubmit)
    }

    // Add item submit
    const itemAddSubmit = function (e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== "" && input.calories !== "") {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI List
            UICtrl.addListItem(newItem);

            // Clear fields
            UICtrl.clearFields()

        }

        e.preventDefault()
    }

    // Public Methods
    return {
        init: function () {
            // Fetch items from data object
            const items = ItemCtrl.getItems();

            // Populate list with items
            UICtrl.populateItemList(items);

            // Load event listeners
            loadEventListeners()
        }
    }
})(ItemCtrl, UICtrl);

////////////////////////////////////////////////////////////////////////////
// INITIALIZE APP
AppCtrl.init()