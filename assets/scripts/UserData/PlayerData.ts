import { _decorator, Component, Node } from 'cc';
import { SkillDataInstance } from './SkillData';
import { ItemDataInstance } from './ItemData';

export class PlayerData
{
    public PlayerID:string;
    public Name:string;
    public Level:number;
    public ExperiencePoints:number;
    public HealthPoints:number;
    public ManaPoints :number;
    public Attributes = [];
    public Inventory:Array<ItemDataInstance> = new Array<ItemDataInstance>();
    public Skills:Array<SkillDataInstance> = new Array<SkillDataInstance>();
    public EquippedItems:Array<number> = new Array<number>();
    public Quests = [];
    public Currency:number;
    public StatusEffects = [];
    public IsSoundOpen:boolean = true;
    public IsVibrateOpen:boolean = true;
}

