const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

test("when a partition key is provided, it would be used as the candidate", () => {
  const payload = {
    name: "benjamin",
    partitionKey: "hello",
  };

  const candidate = deterministicPartitionKey(payload);

  expect(candidate).toBe(payload.partitionKey);
});


test("when the partition key provided is not a string", () => {
    const payload = {
      name: "benjamin",
      partitionKey: {"key": "ahahahseiei"},
    };
  
    const candidate = deterministicPartitionKey(payload);
    const result = JSON.stringify(payload.partitionKey);
  
    expect(candidate).toBe(result);

    const payload2 = {
        name: "benjamin",
        partitionKey: 111111,
      };
    
      const candidate2 = deterministicPartitionKey(payload2);
      const result2 = JSON.stringify(payload2.partitionKey);
    
      expect(candidate2).toBe(result2);

      const payload3 = {
        name: "benjamin",
        partitionKey: [1,2],
      };
    
      const candidate3 = deterministicPartitionKey(payload3);
      const result3 = JSON.stringify(payload3.partitionKey);
    
      expect(candidate3).toBe(result3);

      const payload4 = {
        name: "benjamin",
        partitionKey: true,
      };
    
      const candidate4 = deterministicPartitionKey(payload4);
      const result4 = JSON.stringify(payload4.partitionKey);
    
      expect(candidate4).toBe(result4);
  });


test("when a partition key is not provided, it would use a sha512 hash generated using the payload", () => {
    const payload = {
        name: "benjamin",
    };

   const hash = crypto.createHash("sha3-512").update(JSON.stringify(payload)).digest("hex")

    const candidate = deterministicPartitionKey(payload);
    
    expect(candidate).toBe(hash);


    const payload2 = {
        name: "benjamin",
        partitionKey: false,
    };

   const hash2 = crypto.createHash("sha3-512").update(JSON.stringify(payload2)).digest("hex")

    const candidate2 = deterministicPartitionKey(payload2);
    
    expect(candidate2).toBe(hash2);

    const payload3 = {
        name: "benjamin",
        partitionKey: 0,
    };

   const hash3 = crypto.createHash("sha3-512").update(JSON.stringify(payload3)).digest("hex")

    const candidate3 = deterministicPartitionKey(payload3);
    
    expect(candidate3).toBe(hash3);
  });


  test("when a partition key provided is greater than 256 characters, it would hash the partition key and use the hashed value", () => {
    const payload = {
        name: "benjamin",
        partitionKey: "hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellhellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohelloohellohellohellohellohellohellohellohellohello",
    };

   const hash = crypto.createHash("sha3-512").update(payload.partitionKey).digest("hex");

    const candidate = deterministicPartitionKey(payload);
    
    expect(candidate).toBe(hash);
  });