export namespace db {
	
	export class ChiefMechanic {
	    mechanic_id: number;
	    name: string;
	    phone: string;
	    specialization: string;
	    role: string;
	    added_date: string;
	    updated_date: string;
	
	    static createFrom(source: any = {}) {
	        return new ChiefMechanic(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mechanic_id = source["mechanic_id"];
	        this.name = source["name"];
	        this.phone = source["phone"];
	        this.specialization = source["specialization"];
	        this.role = source["role"];
	        this.added_date = source["added_date"];
	        this.updated_date = source["updated_date"];
	    }
	}
	export class InventoryItem {
	    item_id: number;
	    name: string;
	    type: string;
	    unit: string;
	    quantity_available: number;
	    min_stock_level: number;
	    location: string;
	    last_restocked: string;
	
	    static createFrom(source: any = {}) {
	        return new InventoryItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.item_id = source["item_id"];
	        this.name = source["name"];
	        this.type = source["type"];
	        this.unit = source["unit"];
	        this.quantity_available = source["quantity_available"];
	        this.min_stock_level = source["min_stock_level"];
	        this.location = source["location"];
	        this.last_restocked = source["last_restocked"];
	    }
	}
	export class LogIssue {
	    log_id: number;
	    issue_id: number;
	    controller_id: number;
	    action_taken: string;
	    parts_replaced: string;
	    ship_id: number;
	    reporter_id: number;
	    mechanic_id: number;
	    hours_spent: number;
	    completion_date: string;
	
	    static createFrom(source: any = {}) {
	        return new LogIssue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.log_id = source["log_id"];
	        this.issue_id = source["issue_id"];
	        this.controller_id = source["controller_id"];
	        this.action_taken = source["action_taken"];
	        this.parts_replaced = source["parts_replaced"];
	        this.ship_id = source["ship_id"];
	        this.reporter_id = source["reporter_id"];
	        this.mechanic_id = source["mechanic_id"];
	        this.hours_spent = source["hours_spent"];
	        this.completion_date = source["completion_date"];
	    }
	}
	export class LogIssueReport {
	    log_id: number;
	    issue_id: number;
	    issue_description: string;
	    ship_id: number;
	    ship_name: string;
	    mechanic_id: number;
	    mechanic_name: string;
	    controller_id: number;
	    controller_name: string;
	    action_taken: string;
	    parts_replaced: string;
	    hours_spent: number;
	    completion_date: string;
	
	    static createFrom(source: any = {}) {
	        return new LogIssueReport(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.log_id = source["log_id"];
	        this.issue_id = source["issue_id"];
	        this.issue_description = source["issue_description"];
	        this.ship_id = source["ship_id"];
	        this.ship_name = source["ship_name"];
	        this.mechanic_id = source["mechanic_id"];
	        this.mechanic_name = source["mechanic_name"];
	        this.controller_id = source["controller_id"];
	        this.controller_name = source["controller_name"];
	        this.action_taken = source["action_taken"];
	        this.parts_replaced = source["parts_replaced"];
	        this.hours_spent = source["hours_spent"];
	        this.completion_date = source["completion_date"];
	    }
	}
	export class Ship {
	    id: number;
	    name: string;
	    imo_number: string;
	    ship_type: string;
	    gross_tonnage: number;
	    year_built: number;
	    current_status: string;
	    added_date: string;
	    updated_date: string;
	
	    static createFrom(source: any = {}) {
	        return new Ship(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.imo_number = source["imo_number"];
	        this.ship_type = source["ship_type"];
	        this.gross_tonnage = source["gross_tonnage"];
	        this.year_built = source["year_built"];
	        this.current_status = source["current_status"];
	        this.added_date = source["added_date"];
	        this.updated_date = source["updated_date"];
	    }
	}
	export class ShipIssue {
	    issue_id: number;
	    ship_id: number;
	    reporter_id: number;
	    issue_type: string;
	    issue_title: string;
	    description: string;
	    issue_status: string;
	    reported_date: string;
	    started_date: string;
	    system_affected: string;
	    severity_level: string;
	    assigned_to: number;
	    updated_date: string;
	
	    static createFrom(source: any = {}) {
	        return new ShipIssue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.issue_id = source["issue_id"];
	        this.ship_id = source["ship_id"];
	        this.reporter_id = source["reporter_id"];
	        this.issue_type = source["issue_type"];
	        this.issue_title = source["issue_title"];
	        this.description = source["description"];
	        this.issue_status = source["issue_status"];
	        this.reported_date = source["reported_date"];
	        this.started_date = source["started_date"];
	        this.system_affected = source["system_affected"];
	        this.severity_level = source["severity_level"];
	        this.assigned_to = source["assigned_to"];
	        this.updated_date = source["updated_date"];
	    }
	}
	export class ShipMechanicToShip {
	    id: number;
	    ship_id: number;
	    mechanic_id: number;
	
	    static createFrom(source: any = {}) {
	        return new ShipMechanicToShip(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.ship_id = source["ship_id"];
	        this.mechanic_id = source["mechanic_id"];
	    }
	}
	export class WorkOrderItem {
	    item_id: number;
	    order_id: number;
	    quantity_used: number;
	    notes: string;
	
	    static createFrom(source: any = {}) {
	        return new WorkOrderItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.item_id = source["item_id"];
	        this.order_id = source["order_id"];
	        this.quantity_used = source["quantity_used"];
	        this.notes = source["notes"];
	    }
	}

}

