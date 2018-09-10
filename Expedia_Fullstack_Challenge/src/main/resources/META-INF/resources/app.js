document.addEventListener('DOMContentLoaded', () => {
    const formEl = document.querySelector('form[name="invoice-form"]');
    formEl.querySelector('button').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(formEl.checkValidity()) {
            generateInvoice({
                name: document.querySelector('#prodName').value,
                quantity: document.querySelector('#qty').value,
                tax: document.querySelector('#tax').value,
                // cat: document.querySelector('#cat').value,
                price: document.querySelector('#price').value
            });
        }
    });
    const catEl = formEl.querySelector('#cat');
    catEl.addEventListener('change', (event) => {
        const taxEl = formEl.querySelector('#tax');
        if(catEl.value === 'med') {
            taxEl.value = 0;
        }
        else if(catEl.value === 'other') {
            taxEl.value = 20;
        }
        else {
            taxEl.value = undefined;
        }
    });
});

function generateInvoice(invoiceObj) {
    postRequest('/invoice', invoiceObj, 'json').then(response => {
        showInvoiceSuccess(response);
    });
}

function showInvoiceSuccess(invoiceData) {
    const tableTemplate = `
    <table class="table">
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Total</th>
        </tr>
        <tr>
            <td>${invoiceData.name}</td>
            <td>${invoiceData.quantity}</td>
            <td>${invoiceData.price}</td>
            <td>${invoiceData.tax}</td>
            <td>${invoiceData.total}</td>
        </tr>
        <tr>
            <td colspan="2">
                <h5>Total Tax: ${invoiceData.tax}</h5>
            </td>
            <td colspan="3" class="text-right">
                <h3>Grant Total: ${invoiceData.total}</h3>
            </td>
        </tr>
    </table>`;
    document.querySelector('div').innerHTML = tableTemplate;
}

function postRequest(url, jsonObj, responseType) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            body: JSON.stringify(jsonObj),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => {
            response[responseType]().then(data => {
                response.ok ? resolve(data) : reject(data);
            });
        })
        .catch(err => {
            reject(err);
        });
    });
}

function getRequest(url, queryParams, responseType) {
    queryParams = queryParams === '' ? '' : `?${queryParams}`;
    return new Promise((resolve, reject) => {
        fetch(`${url}${queryParams}`, {
            method: 'GET'
        })
        .then(response => {
            response[responseType]().then(data => {
                response.ok ? resolve(data) : reject(data);
            });
        })
        .catch(err => {
            reject(err);
        });
    });
}