import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export async function hasMarket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const marketOwnerId = req.params.marketOwnerId;

  const marketOwner = await User.findById(marketOwnerId);

  if (!marketOwner) {
    return res.status(404).json({ message: "Market Owner can not fount" });
  }

  if (marketOwner.role !== "marketOwner") {
    return res
      .status(400)
      .json({ message: "Only market owners can do this operation" });
  }

  return res.status(200).json({
    message: "Here is your market",
    marketName: marketOwner.marketName,
    role: marketOwner.role,
  });
}

export async function updateMarket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newMarketName = req.body.newMarketName;
  const marketOwnerId = req.params.marketOwnerId;

  const marketOwner = await User.findById(marketOwnerId);

  if (!marketOwner) {
    return res.status(404).json({ message: "Market Owner can not fount" });
  }

  if (marketOwner.role !== "marketOwner") {
    return res
      .status(400)
      .json({ message: "Only market owners can do this operation" });
  }

  if (newMarketName === "") {
    return res.status(400).json({ message: "This field must be fill" });
  }

  marketOwner.marketName = newMarketName;

  try {
    await marketOwner.save();
    res.status(201).json({
      message: "Market Name successfully updated!",
      marketName: newMarketName,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function deleteMarket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const marketOwnerId = req.params.marketOwnerId;

  const marketOwner = await User.updateOne(
    { _id: marketOwnerId },
    { $unset: { marketName: 1 } }
  );

  if (!marketOwner) {
    return res.status(404).json({ message: "Market owner can not found!" });
  }

  return res.status(201).json({ message: "Market Name successfully deleted!" });
}
