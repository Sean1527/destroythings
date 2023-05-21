import { _decorator, Component, Node } from 'cc';

export class SkillData
{
    public ID:number;
    public Name:string;
    public Cost:number;
    public Description:string;
    public Effect:number;
    public Cooldown:number;
    public Type:number;
    public LevelRequirement:number;
    public SkillIcon:string;
    public Animation:string;
    public TargetTypes:number[] =[];
    public Prerequisites:number[] = [];
}

export class SkillDataInstance
{
    public SkillID:number;
    public PlayerID:number;
    public CurrentLevel:number;
    public CurrentCooldown:number;
    public Enabled:boolean;
}