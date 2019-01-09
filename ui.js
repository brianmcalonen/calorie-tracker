////////////////////////////////////////////////////////////////////////////
// UI CONTROLLER

const UICtrl = (function () {
    // UI Selectors
    const UISelectors = {
        itemList: "#item-list",
        listItems: "#item-list li",
        addBtn: ".add-btn",
        clearBtn: ".clear-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: ".total-calories"
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
            li.innerHTML =
                `<strong>${item.name}: </strong> 
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>`
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);

        },
        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Convert Node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function (listItem) {
                const itemID = listItem.getAttribute("id");

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML =
                        `<strong>${item.name}: </strong> 
                        <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                        </a>`
                }
            });
        },
        deleteListItem: function (id) {
            const itemID = `#item-${id}`;

            const item = document.querySelector(itemID);

            item.remove();
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
        removeItems: function () {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Conver Node list into array
            listItems = Array.from(listItems);

            // Remove each item from array
            listItems.forEach(item => item.remove());
        },
        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearFields: function () {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value =
                ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value =
                ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        clearEditState: function () {
            // Call the clearFields function
            UICtrl.clearFields();
            // Hide other buttons
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        }

    }
})();