1. First we make assumption on different types of partition keys that can be passed.
2. Add a lot of test cases before refactoring.
2. Simplify the multiple If statement for readability purpose. When partition key is not provided use the hash generated from the event payload.
3. Since candidate would always be set there's no point having a conditional on line 17 and we can also remove the constant TRIVIAL_PARTITION_KEY since candidate would always be set.