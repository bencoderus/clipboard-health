There are 3 tables at the moment.

1.  facilities
2.  agents.
3.  shifts

  
The structure in my head.

**facilities**

*   id
*   name

**agents**

*   id
*   name
*   department

**shifts**

*   id
*   code
*   date
*   start\_time
*   end\_time
*   facility\_id
*   timestamps.

  
**Methods**.

1.  getShiftByFacility(facilityId: string|number)
2.  generateReport(shifts: array)

  
**What needs to be done?**   
1\. First normalize the DB and add a new table \`agent\_shift\`. with the schema below. - id. - shift\_id. - custom\_id. - agent\_id

Now the relationship would be.

*   A many-to-many relationship has been established between agents and shifts. agent\_shift would be used as the pivot table.
*   A facility has many shifts.
*   A shift belongs to a facility.

  
2\. Modification to save Modify the existing functionality to save custom\_id for agents when they are assigned to a shift by the facility admin, and make provision to save the record on the \`agent\_shift\` table. You can also make provisions to migrate all the existing data stored into this table. When migrating the existing data, since custom\_id would be null, we can generate a random UUID and save it for the existing records. 

  
3\. Update all SQL queries used in getShiftByFacility and generateReport, since the update would break the existing code. 

  
4\. Add a new function named generateReportWithAgentCustomId(customIds: array) to generate PDF reports using the agent\_custom\_id. 

  
5\. Add new test cases and fix broken test cases (if there's a function that saves a shift or assigns an agent to a shift, it would be broken since it needs the custom\_id now).