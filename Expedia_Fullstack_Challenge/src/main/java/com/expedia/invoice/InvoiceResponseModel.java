package com.expedia.invoice;

public class InvoiceResponseModel {

    private  String name;
    private  int quantity;
    private  float price;
    private  float tax;
    private float total;

    public InvoiceResponseModel(String name, int quantity, float price, float tax) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.tax = price * quantity * (tax/(float)100);
        this.total = price * quantity + this.tax;
    }
    
    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @return the price
     */
    public float getPrice() {
        return price;
    }

    /**
     * @return the tax
     */
    public float getTax() {
        return tax;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(float price) {
        this.price = price;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * @param tax the tax to set
     */
    public void setTax(float tax) {
        this.tax = tax;
    }

    /**
     * @return the total
     */
    public float getTotal() {
        return total;
    }

    /**
     * @param total the total to set
     */
    public void setTotal(float total) {
        this.total = total;
    }
}