const categoryList = document.getElementById("categoryList");
const itemTable = document.getElementById("items");
const filterSelect = document.getElementById("filterSelect");

function displayItemsFromCategory(id) {
    fetch(`/api/items?category=${id}`)
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            const sortOption = filterSelect.value;
            if (sortOption === "1") {
                body.sort((a, b) => b.price - a.price);
            } else if (sortOption === "2") {
                body.sort((a, b) => a.price - b.price);
            }

            itemTable.innerHTML = "";

            let row = document.createElement("div");
            row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3";

            for (let item of body) {
                let col = document.createElement("div");
                let card = document.createElement("div");
                let cardBody = document.createElement("div");

                col.className = "col";
                card.className = "card h-100";
                cardBody.className = "card-body";

                cardBody.innerHTML = `
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Price: $${item.price}</strong></p>
                    <button class="btn btn-primary">Add to Cart</button>
                `;

                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);

                const addToCartButton = cardBody.querySelector(".btn.btn-primary");
                addToCartButton.addEventListener("click", () => {
                    updateCart(item.id);
                });
            }

            itemTable.appendChild(row);
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateCart(id) {
    fetch("/api/cart/items")
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            console.log(body);

            if (!checkItemId(body, id)) {
                fetch("/api/cart/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({item_id: id, quantity: 1}),
                })
                .then((response) => {
                    response.ok ? console.log("Item added") : console.log("Item was not added");
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            else {
                const newQuantity = returnQuantity(body, id) + 1;

                fetch(`/api/cart/update/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({quantity: newQuantity}),
                })
                .then((response) => {
                    response.ok ? console.log("Updated") : console.log("Failed");
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

function checkItemId(cart, item_id) {
    for (item of cart) {
        if (item.item_id === item_id) {
            return true;
        }
    }
    return false;
}

function returnQuantity(cart, item_id) {
    for (item of cart) {
        if (item.item_id === item_id) {
            return item.quantity;
        }
    }
}

fetch("/api/item/categories")
    .then((response) => {
        return response.json();
    })
    .then((body) => {
        for (let category of body) {
            const li = document.createElement("li");
            li.className = "nav-item";
            const a = document.createElement("a");
            a.className = "nav-link";
            a.href = "#";
            a.textContent = category.name;
            a.style.color = "black";
            a.setAttribute("data-id", category.id);

            a.addEventListener("click", () => {
                const links = document.querySelectorAll(".nav-link");
                for (let i = 0; i < links.length; i++) {
                    links[i].classList.remove("selected");
                }
                a.classList.add("selected");

                displayItemsFromCategory(category.id);
            });

            li.appendChild(a);
            categoryList.appendChild(li);
        }

        if (body.length > 0) {
            const firstCategoryLink = categoryList.querySelector(".nav-link");
            firstCategoryLink.classList.add("selected");
            firstCategoryLink.click();
            displayItemsFromCategory(1);
        }
    })
    .catch((error) => {
        console.log(error);
    });

filterSelect.addEventListener("change", () => {
    const selectedCategory = document.querySelector(".nav-link.selected");
    if (selectedCategory) {
        const categoryId = selectedCategory.getAttribute("data-id");
        displayItemsFromCategory(categoryId);
    }
});
