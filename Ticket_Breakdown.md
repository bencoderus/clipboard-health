There 3 tables at the moment.
1. facilities
2. agents.
3. shifts

<br/>
The structure in my head.

facilities
- id
- name

agents
- id
- name
- department

shifts
- id
- code
- date
- start_time
- end_time
- facility_id
- timestamps.

<br/>
Methods.

1. getShiftByFacility(facilityId: string|number)
2. generateReport(shifts: array)

<br/>
What needs to be done? 
<br/>
1. First normalize the DB and add a new table `agent_shift`. with the schema below.
- id.
- shift_id.
- custom_id.
- agent_id

Now the relation would be.
- A many to many relation has been established between agents and shifts, agent_shift would be used as the pivot table.
- A facility has many shifts.
- A shift belongs to a facility.

<br/>
2. Modification to save Modify the existing functionality to save custom_id for agent when they are assigned to a shift by the facility admin, and make provision to save the record on the `agent_shift` table. You can also make provisions to migrate all the existing data stored into this table. When migrating the existing data since custom_id would be null, we can generate a random uuid and save for the existing records.

<br/>
3. Update all SQL queries used in getShiftByFacility and generateReport, since the update would break the existing code.

<br/>
4. Add a new function named generateReportWithAgentCustomId(customIds: array) to generate PDF report using the agent_custom_id.

<br/>
5. Add new test cases and fix broken test cases (if there's a function that saves shift or assigns an agent to a shift it would be broken since it needs the custom_id now).