import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import User from "../models/user";

export async function getCart(req: Request, res: Response, next: NextFunction) {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found!" });
  }
  const items = user.cart.items;

  return res
    .status(200)
    .json({ message: "There is your cart items", items: items });
}

export async function postCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const productId = req.params.productId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found!" });
  }

  const userProduct = await Product.findById(productId);

  const addToCart = (product: any) => {
    const cartProductIndex = user.cart.items.findIndex((cp: any) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...user.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = user.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity,
      });
    }
    //ONLY PREMIUM
    if (
      user.role !== "premium" &&
      user.cart.items[cartProductIndex].quantity > 3
    ) {
      return res
        .status(400)
        .json({ message: "Only premium users can buy more than 3 products" });
    }

    const updatedCart = { items: updatedCartItems };
    user.cart = updatedCart;
    return user.save();
  };

  addToCart(userProduct);

  return res
    .status(201)
    .json({ message: "Added to cart !", cartItems: user.cart.items });
}

export async function deleteCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId;
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found !" });
  }

  const deleteCart = function () {
    // const existingItem = user.cart.items.findIndex((p: any) => {
    //   return p.productId.toString() === productId;
    // });

    // const updatedCartItems = [...user.cart.items];

    // if (existingItem >= 0) {
    //   return user.cart.items[existingItem].quantity - 1;
    // }

    // const selectedItem = user.cart.items.filter((item: any) => {
    //   let deletedQuantity = 1;
    //   if (item.productId.toString() === productId) {
    //     return item.quantity;
    //   }
    //   if (item.quantity === 1) {
    //     return user.cart.items.filter((p: any) => {
    //       return p.productId.toString() !== productId;
    //     });
    //   }
    // });

    const deletedItem = user.cart.items.filter((item: any) => {
      return item.productId.toString() !== productId;
    });

    user.cart.items = deletedItem;

    return user.save();
  };

  deleteCart();

  return res
    .status(201)
    .json({ message: "Cart successfully deleted !", cart: user.cart.items });
}

export async function getFavotire(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found !" });
  }

  if (user.role === "marketOwner") {
    return res
      .status(403)
      .json({ message: "Market Owners can not do this operation." });
  }

  const favorites = user.favorites;

  return res
    .status(200)
    .json({ message: "Here is your favorite products", favorites: favorites });
}

export async function addFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const productId = req.params.productId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found !" });
  }

  if (user.role === "marketowner") {
    return res
      .status(403)
      .json({ message: "Market owner can not do this operation." });
  }

  const selectedProduct = await Product.findById(productId);

  const addToFavorites = (product: any) => {
    const existingProduct = user.favorites.favoriteItems.findIndex((p: any) => {
      return p.productId.toString() === product._id.toString();
    });
    const favoriteProducts = [...user.favorites.favoriteItems];

    if (existingProduct >= 0) {
      return res
        .status(403)
        .json({ message: "You can not add same product to favorite." });
    } else {
      favoriteProducts.push({
        productId: product._id,
      });
    }

    const updatedFavorites = { favoriteItems: favoriteProducts };
    user.favorites = updatedFavorites;
    return user.save();
  };

  addToFavorites(selectedProduct);

  const favorites = user.favorites.favoriteItems;

  return res.status(201).json({
    message: "Favorite product successfully added your favorites.",
    favorites: favorites,
  });
}

export async function deleteFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const productId = req.params.productId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found !" });
  }

  const isFavoriteEmpty = user.favorites.favoriteItems.findIndex((fav: any) => {
    return fav.productId.toString() === productId;
  });

  if (isFavoriteEmpty === 0 || isFavoriteEmpty === -1) {
    return res
      .status(400)
      .json({ message: "Selected item is not your favorite !" });
  }

  const deleteFav = function () {
    const deletedFav = user.favorites.favoriteItems.filter((fav: any) => {
      return fav.productId.toString() !== productId;
    });

    user.favorites.favoriteItems = deletedFav;
    user.save();
  };

  deleteFav();
  return res.status(201).json({
    message: "Selected favorite item successfully deleted",
    favorites: user.favorites.favoriteItems,
  });
}
