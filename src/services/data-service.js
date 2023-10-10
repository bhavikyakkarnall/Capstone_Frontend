export class DataService {
    #item;
    #staff;
    #order;

    constructor() {
        this.#item = [
            //EVE
            {
                "itemId": "2810001",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "Eve's product details",
                "productImg": "/",
                "serialNo": "20000001",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810002",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000002",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810003",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000003",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810004",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000004",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810005",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000005",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810006",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000006",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810007",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000007",
                "location": "Warehouse",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810008",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000008",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810009",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000009",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2810010",
                "productName": "EVE",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "serialNo": "20000010",
                "location": "Warehouse",
                "userID": "-",
                "createAt": "01-01-2023",
                "updatedAt": "-"
            },

            //GO
            {
                "itemId": "2840001",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001001",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840002",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001002",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840003",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001003",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840004",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001004",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840005",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001005",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840006",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001006",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840007",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001007",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840008",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001008",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840009",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001009",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },
            {
                "itemId": "2840010",
                "productName": "GO",
                "productType": "Medical",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "40001010",
                "createdAt": "01-01-2023",
                "updatedAt": "-"
            },

            //DSC Neo
            {
                "itemId": "2910001",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001001",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910002",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001002",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910003",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001003",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910004",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001004",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910005",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001005",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910006",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001006",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910007",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001007",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910008",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001008",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910009",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001009",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },
            {
                "itemId": "2910010",
                "productName": "DSC Neo",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "90001010",
                "createdAt": "01-01-2023",
                "updatedAt": "N/a"
            },

            //Qolysys
            {
                "itemId": "2710001",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001001",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710002",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001002",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710003",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001003",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710004",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001004",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710005",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001005",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710006",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001006",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710007",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001007",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710008",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001008",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710009",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001009",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
            {
                "itemId": "2710010",
                "productName": "Qolsys",
                "productType": "Security",
                "productDesc": "details",
                "productImg": "/",
                "location": "Warehouse",
                "userID": "-",
                "serialNo": "70001010",
                "createdAt": "01-01-2023",
                "updatedAt": "05-01-2023"
            },
        ];

        this.#order = [
            {
                "orderId": "1",
                "userId": "001",
                "status": "Completed",
                "tracking": "2TPALH 123456",
                "orderedProduct" : [{"productName": "EVE", "qty": 2}, {"productName": "Go", "qty": 2},{"productName": "DSC Neo", "qty": 2},{"productName": "Qolsys", "qty": 2}],
                "items": ["2810001", "2810002", "2910001", "2910002"],
                "createAt": "05-01-2023",
                "updatedAt": "10-01-2023"
            },
            {
                "orderId": "2",
                "userId": "001",
                "status": "Completed",
                "tracking": "2TPALH 123457",
                "orderedProduct" : [{"productName": "EVE", "qty": 2}, {"productName": "Go", "qty": 2},{"productName": "DSC Neo", "qty": 2},{"productName": "Qolsys", "qty": 2}],
                "items": ["2810003", "2810004", "2910004", "2910003"],
                "createAt": "06-01-2023",
                "updatedAt": "10-01-2023"
            },
            {
                "orderId": "3",
                "userId": "002",
                "status": "Submitted",
                "tracking": "-",
                "orderedProduct" : [{"productName": "EVE", "qty": 2}, {"productName": "Go", "qty": 2},{"productName": "DSC Neo", "qty": 2},{"productName": "Qolsys", "qty": 2}],
                "items": [],
                "createAt": "05-01-2023",
                "updatedAt": "-"
            }

        ]

        this.#staff = [
            {
                "userId": "001",
                "name": "Shona",
                "company": "HomeSafe",
                "address": "Manukau, Auckland",
                "phone": "02112345678",
                "email": "shona@test.com"
            },
            {
                "userId": "002",
                "name": "Geoff",
                "company": "HomeSafe",
                "address": "Clevedon, Auckland",
                "phone": "02112345678",
                "email": "geoff@test.com"
            },
            {
                "userId": "003",
                "name": "Mike",
                "company": "Security Alert",
                "address": "Remura, Auckland",
                "phone": "02112345678",
                "email": "mike@test.com"
            },
            {
                "userId": "004",
                "name": "Verryn",
                "company": "Security Alert",
                "address": "Papakura, Auckland",
                "phone": "02112345678",
                "email": "verryn@test.com"
            },
            {
                "userId": "005",
                "name": "Richard",
                "company": "1Tech",
                "address": "Mt.Wellington, Auckland",
                "phone": "02112345678",
                "email": "richard@test.com"
            },
        ]
    }

    getAllItems() {
        return this.#item;
    }

    getAllOrders() {
        return this.#order;
    }

    getAllStaffs() {
        return this.#staff;
    }

    filterUniqueProductDetails() {
        const uniqueProducts = {};

        this.#item.forEach((item) => {
            const productName = item.productName;
            const productDesc = item.productDesc;
            const productImg = item.productImg

            if (!uniqueProducts[productName]) {
                uniqueProducts[productName] = productDesc;
            }
        });

        const uniqueProductArray = [];

        for (const productName in uniqueProducts) {
            if (uniqueProducts.hasOwnProperty(productName)) {
                uniqueProductArray.push({
                    productName: productName,
                    productDesc: uniqueProducts[productName],
                    productImg: uniqueProducts[productName],
                });
            }
        }

        return uniqueProductArray;
    }


}