import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success:false, message:"Please fill all fields"}
        } else {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] })) // add d data from backend to Global State
            return {
                success: true,
                message: "product created successfully"
            }
        }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json();
        set({ products: data.data})// add d data from backend to Global State

    },
    
    deleteProduct: async (productId) => {

        const res = await fetch(`/api/products/${productId}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message } //message from backend
        } else {

            set(state => ({ products: state.products.filter((product) => product._id !== productId) }));
            return { success: true, message: data.message };
        }
        
    },

    updateProduct: async (productId, updatedProduct) => {

        const res = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },               
            body: JSON.stringify(updatedProduct) // send d new data to backend
        });

        const data = await res.json(); //backend send d data back to frontend
        if (!data.success) { //if there is error 
            return {success:false, message: data.message}
        } else { //if there is no error,set d data to a STATE
            set((state) => ({
                products:
                    //set(state => state.previousArrayOfObjects.map((eachObjectIntheArrayOfObjects))) and replace d prev data with new data
                    state.products.map((product) => (product._id === productId ? data.data : product))
            }));

            return {success:true, message: data.message}
        }
    }


})
    
)