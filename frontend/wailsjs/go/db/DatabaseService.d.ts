// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {db} from '../models';

export function AddInventoryItem(arg1:db.InventoryItem):Promise<void>;

export function AddLogIssue(arg1:db.LogIssue):Promise<void>;

export function AddMechanic(arg1:db.ChiefMechanic):Promise<void>;

export function AddShip(arg1:db.Ship):Promise<void>;

export function AddShipIssue(arg1:db.ShipIssue):Promise<void>;

export function AddWorkOrderItems(arg1:number,arg2:Array<db.WorkOrderItem>):Promise<void>;

export function AssignMechanicToShip(arg1:number,arg2:number):Promise<void>;

export function GetAllShipsLogReports():Promise<Array<db.LogIssueReport>>;

export function GetLogIssueReportByID(arg1:number):Promise<db.LogIssueReport>;

export function GetLogsIssues():Promise<Array<db.LogIssue>>;

export function GetMechanics():Promise<Array<db.ChiefMechanic>>;

export function GetShipAssignments():Promise<Array<db.ShipMechanicToShip>>;

export function GetShipIssues():Promise<Array<db.ShipIssue>>;

export function GetShipLogIssueReports(arg1:number):Promise<Array<db.LogIssueReport>>;

export function GetShips():Promise<Array<db.Ship>>;

export function UpdateInventoryItem(arg1:db.InventoryItem):Promise<void>;
