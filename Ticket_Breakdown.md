There 3 tables at the moment.
1. facilities
2. agents.
3. shifts

The structure in my head
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
- timestamps

Methods
1. getShiftByFacility(facilityId: string|number)
2. generateReport(shifts: array)

1. First normalize the DB and add a new table agent_shift. with the schema below.
`agent_shift`
- id.
- shift_id.
- custom_id.
- agent.

Now the relation would be.
1. A many to many relation has been established between agents and shifts, agent_shift would be used as the pivot table.
2. A facility has many shifts.
3. A shift belongs to a facility.

2. Modify the existing functionality to save custom_id for agent when they are assigned to a shift by the facility admin, and make provision to save the record on the `agent_shift` table. You can also make provisions to migrate all the existing data stored into this table and update the existing queries. When migrating the existing data since custom_id would be null, we can generate a random uuid and save for the existing records.

3. Add a new function generateReportWithAgentCustomId() to generate PDF report using the agent_custom_id.