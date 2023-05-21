import { _decorator, Component, Node } from 'cc';

export class ItemData
{
    public ID:number;
    public ItemName:string;
    public Description:string;
    public Type:number;
    public Effect:number;
    public Value:number;
    public Icon:string;
    public UsageLimit:number;
    public LevelRequirement:number;
    public Rarity:number;
}

export class ItemDataInstance
{
    public ItemID:number;
    public PlayerID:number;
    public Quantity:number;
    public EquippedState:number;
    public Durability:number;
    public Customizations:number;
}