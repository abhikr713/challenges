package com.expedia.invoice;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class Controller {

    @RequestMapping(value="/invoice", method=RequestMethod.POST)
    public InvoiceResponseModel greeting(@RequestBody InvoiceRequestModel invoiceReq) {
        return new InvoiceResponseModel(invoiceReq.getName(), invoiceReq.getQuantity(), invoiceReq.getPrice(), invoiceReq.getTax());
    }
}
