export default class DataService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getItems() {
        try {
            const response = await fetch(this.baseUrl + "/api/item/");
            const items = await response.json();
            return items;
        } catch (error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        }
    }

    async postItem(item) {
        try {
            const response = await fetch(this.baseUrl + "/api/item/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const newItem = await response.json();
            return newItem;
        } catch (error) {
            throw new Error(`Failed to post item: ${error.message}`);
        }
    }

    async deleteItem(itemId) {
        try {
            const response = await fetch(this.baseUrl + `/api/item/${itemId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return true; // Item successfully deleted
            } else {
                throw new Error(`Failed to delete item with ID ${itemId}`);
            }
        } catch (error) {
            throw new Error(`Failed to delete item: ${error.message}`);
        }
    }

    async updateItem(itemId, updatedItem) {
        try {
            const response = await fetch(this.baseUrl + `/api/item/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            const updatedItemResponse = await response.json();
            return updatedItemResponse;
        } catch (error) {
            throw new Error(`Failed to update item: ${error.message}`);
        }
    }

    // CRUD operations for Orders

    async createOrder(order) {
        try {
            const response = await fetch(this.baseUrl + "/api/order/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
            const newOrder = await response.json();
            return newOrder;
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    async getOrder(orderId) {
        try {
            const response = await fetch(this.baseUrl + `/api/order/${orderId}`);
            const order = await response.json();
            return order;
        } catch (error) {
            throw new Error(`Failed to fetch order: ${error.message}`);
        }
    }

    async updateOrder(orderId, updatedOrder) {
        try {
            const response = await fetch(this.baseUrl + `/api/order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrder),
            });
            const updatedOrderResponse = await response.json();
            return updatedOrderResponse;
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    async deleteOrder(orderId) {
        try {
            const response = await fetch(this.baseUrl + `/api/order/${orderId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return true; // Order successfully deleted
            } else {
                throw new Error(`Failed to delete order with ID ${orderId}`);
            }
        } catch (error) {
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }

    // CRUD operations for Users

    async createUser(user) {
        try {
            const response = await fetch(this.baseUrl + "/api/user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const newUser = await response.json();
            return newUser;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async getUser(userId) {
        try {
            const response = await fetch(this.baseUrl + `/api/user/${userId}`);
            const user = await response.json();
            return user;
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    }

    async updateUser(userId, updatedUser) {
        try {
            const response = await fetch(this.baseUrl + `/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            const updatedUserResponse = await response.json();
            return updatedUserResponse;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            const response = await fetch(this.baseUrl + `/api/user/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return true; // User successfully deleted
            } else {
                throw new Error(`Failed to delete user with ID ${userId}`);
            }
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
}
