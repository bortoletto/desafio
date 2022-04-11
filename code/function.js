import { shopping_list, email_list } from './data.js';

function create_bill(s_list, e_list) {
    let products = s_list.products,
        total,
        prices = [],
        amounts = [],
        bill;

    products.forEach((product) => {
        prices.push(product.product_price);
    });

    products.forEach((product) => {
        amounts.push(product.product_amount);
    });

    total = sum_total(prices, amounts);
    
    bill = split_bill(total, e_list);

    return bill;
}

function divide_floor(total, multiplier) {
    if(typeof total !== 'number' || typeof multiplier !== 'number') {
        throw new Error('Invalid parameter');
    }

    return Math.floor(total/multiplier);
}

function divide_remainder(total, multiplier) {
    if(typeof total !== 'number' || typeof multiplier !== 'number') {
        throw new Error('Invalid parameter');
    }

    return total % multiplier;
}

function sum_total(prices, amounts) {
    if(!Array.isArray(prices) || !Array.isArray(amounts)) {
        throw new Error('Invalid parameter');
    }

    if(prices.length !== amounts.length) {
        throw new Error('Different sizes');
    }
    
    let total = 0;

    for(let i = 0; i < prices.length; i++) {
        total += prices[i] * amounts[i];
    }

    return total;
}

function split_bill(total, emails) {
    if(typeof total !== 'number' || !Array.isArray(emails)) {
        throw new Error('Invalid parameter');
    }

    const bill = {};
    let chance,
        lucky_one = '',
        floor = divide_floor(total, emails.length),
        remainder = divide_remainder(total, emails.length);

    if(remainder > 0) {
        chance = Math.floor(Math.random() * emails.length);
        lucky_one = emails[chance];
    }

    for(const [key, value] of emails.entries()) {
       value === lucky_one ? bill[value] = (floor + remainder) / 100 : bill[value] = floor / 100;
    }

    return bill;
}

var final_bill = create_bill(shopping_list, email_list);

document.getElementById("shopping_list").textContent = JSON.stringify(shopping_list, undefined, 2);
document.getElementById("email_list").textContent = JSON.stringify(email_list, undefined, 2);
document.getElementById("result").textContent = JSON.stringify(final_bill, undefined, 2);

export { divide_floor, divide_remainder, sum_total, split_bill, create_bill };