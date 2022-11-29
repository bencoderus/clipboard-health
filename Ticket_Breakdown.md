**There are 3 tables at the moment.**

1.  facilities
2.  agents.
3.  shifts

  
The structure in my head.

**facilities**

*   id BIGINT PK
*   name VARCHAR(70)
*   timestamps

**agents**

*   id BIGINT PK
*   name VARCHAR(70)
*   department VARCHAR(70)
*   timestamps

**shifts**

*   id
*   code VARCHAR(70)
*   start_time timestamp
*   end_time timestamp
*   facility_id FK facilities
*   timestamps.

  
**Methods**.

1.  getShiftByFacility(facilityId: string|number)
2.  generateReport(shifts: array)

  
**What needs to be done?**   
1. First normalize the DB and add a new table `agent_shift`. with the schema below. 

*   id.
*   shift_id BIGINT FK shifts
*   custom_id. VARCHAR(70)
*   agent_id BIGINT FK agents

Now the relationship would be.

*   A many-to-many relationship has been established between agents and shifts. `agent_shift` would be used as the pivot table.
*   A facility has many shifts.
*   A shift belongs to a facility.

  
2. Modify the existing functionality to save custom_id for agents when they are assigned to a shift by the facility admin, and make provision to save the record on the `agent_shift` table. You can also make provisions to migrate all the existing data stored into this table. When migrating the existing data, since `custom_id` would be null, we can generate a random UUID and save it for the existing records. 

  
3. Update all SQL queries used in getShiftByFacility and generateReport, since the update would break the existing code. 

  
4. Add a new function named generateReportWithAgentCustomId(customIds: array) to generate PDF reports using the `agent_custom_id`. 

  
5. Add new test cases and fix broken test cases (if there's a function that saves a shift or assigns an agent to a shift, it would be broken since it needs the custom_id now).