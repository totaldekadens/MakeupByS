
# MakeUpByS - Master Thesis 

## Introduction

MakeUpByS is a new and innovative e-commerce platform that offers makeup products categorized by seasons. The unique selling point of this website is the quiz that helps customers determine which season they match the best with, and then suggests makeup products that will suit their specific features.

Link to demo store: 
https://makeupbys.se/

### Collaborators: 
* Angelica Moberg Skoglund
* Jacob Hoggen


## What you don't see at the website

### Admin

#### Overview Orders


<img width="743" alt="Skärmavbild 2023-01-28 kl  15 36 34" src="https://user-images.githubusercontent.com/90898648/215477844-42ebe8ff-9447-4e0b-b94a-ddeabc9b040c.png">

<img width="713" alt="Skärmavbild 2023-01-28 kl  15 36 52" src="https://user-images.githubusercontent.com/90898648/215477861-51683dc1-047b-432f-9411-6e5b38e712fd.png">

#### Change order status

<img width="616" alt="Skärmavbild 2023-01-28 kl  15 43 26" src="https://user-images.githubusercontent.com/90898648/215478099-2dbca058-52a8-491c-b84c-4ca7595893a4.png">

#### Functionality 

Status description:

* Färdigbehandlad (Completed)
  - Sets a date when the order has been sent and takes out the reserved qty of the products
* Avbruten (Cancelled)
  - Moves the reserved quantities on the products back to the available balance again.
* Pausad (Paused)
  - Puts the order aside. A customer maybe has reached out or maybe something with the payment went wrong.
* Behandlas  (Reserved/In process)
  - Qty of the products are moved to reserved qty from available qty and are ready to be shipped. 
  
Fixed limitations: 

* You cannot change the status of orders that have the status "Färdigbehandlad" (Completed) or "Avbruten" (Cancelled).
* You cannot change an order with the status "Pausad" to "Färdigbehandlad". You will need to change it to "Behandlas" first and then to "Färdigbehandlad". This is because we want a proper process around how an order is being handled.



#### Overview Products

<img width="758" alt="Skärmavbild 2023-01-28 kl  15 59 26" src="https://user-images.githubusercontent.com/90898648/215484429-b6fce90d-01ed-4b77-ab25-5d4cd5a3d7ea.png">

<img width="718" alt="Skärmavbild 2023-01-28 kl  15 59 49" src="https://user-images.githubusercontent.com/90898648/215484873-9515e039-0ca7-4d89-a0a0-695fd36fc3a2.png">

<img width="275" alt="Skärmavbild 2023-01-28 kl  16 03 34" src="https://user-images.githubusercontent.com/90898648/215484913-9e3ddec4-db2e-42c3-a555-a288b2c10f0e.png">

#### Editing Products

<img width="1372" alt="Skärmavbild 2023-01-28 kl  16 13 40" src="https://user-images.githubusercontent.com/90898648/215484999-9f7ac4a0-2758-4b10-99de-8a70c0e6deeb.png">

![Skärmavbild 2023-01-28 kl  16 15 12](https://user-images.githubusercontent.com/90898648/215485070-22fd3522-eee2-4b9e-b8b6-9950dd19e332.png)
![Skärmavbild 2023-01-28 kl  16 15 45](https://user-images.githubusercontent.com/90898648/215485084-2a50b221-a2d2-409a-8b1f-1a9c753525ff.png)

#### Create Products

Huvudartikel:

![Skärmavbild 2023-01-28 kl  16 18 37](https://user-images.githubusercontent.com/90898648/215485192-4e1c02f5-a073-42f5-b1b5-6c286053bff8.png)

Subartikel:

![Skärmavbild 2023-01-28 kl  16 28 46](https://user-images.githubusercontent.com/90898648/215485463-cbb874f8-7220-4b6e-bbad-88012708f564.png)


### Courrier

Functionality behind: 
<img width="632" alt="Skärmavbild 2023-01-28 kl  14 41 35" src="https://user-images.githubusercontent.com/90898648/215486501-8957d61e-92cf-48de-8091-4cc1db28e2b4.png">

You are able to configure each freight option in three different ways
* Normal - Based on a cost table that is based on the total weight of the products in your cart. E.g 0g-500g = 79 kr, 501g -750g = 89kr
* Free shipping - The shipping cost is 0 kr no matter what
* Free shipping from - The shipping cost is 0 kr after a certain total amount.

E.g from database. These changes are not possible to change at the website at the moment, only in DB. 

Varubrev 1:a-klass with free shipping: 
![Skärmavbild 2023-01-28 kl  14 49 14](https://user-images.githubusercontent.com/90898648/215488355-ed45f72d-841e-4ddf-a480-8b3c085ef2c2.png)

MyPack Home with normal configuaration:
![Skärmavbild 2023-01-28 kl  14 51 09](https://user-images.githubusercontent.com/90898648/215488391-0af73466-9ff1-4710-907c-01bdc42bec9d.png)

## Focus on next release

### Admin
* Able to create, change and delete categories
* Able to configure the freight at the website
* Able to search at customers and change info 
* Orders
    - Able to search a specific order
 
 ### Webshop
 * Able to see an overview of all categories. (right now, you need to go inside a season to see categories)
 * Able to save your cart
 * Get the website responsive with rotated mobile devices
 * Nodemailer
    - Order confirmation shall be developed and not ending up in trash
    - "Order shipped" and "Order cancelled" shall be implemented
 * Filtering of colors and brands on season- and category page
 
 ### Account
 * You will need to verify your emailaddress when you create an account
