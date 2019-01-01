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
            { id: 0, name: "Veggie Lasagna", calories: 1200 },
            { id: 1, name: "Eggs Benedict", calories: 700 },
            { id: 2, name: "Tuna Tartar", calories: 450 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Return data to make it public
    return {
        getItems: function () {
            return data.items;
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
        addBtn: ".add-btn"
    }

    // Public Methods
    return {
        populateItemList: function (items) {
            let html = "";

            items.forEach(function (item) {
                html += `            
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function () {
            return UISelectors;
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
        console.log('Add');

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