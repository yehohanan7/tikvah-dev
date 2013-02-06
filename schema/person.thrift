namespace java tikvah.test.model.person

union PersonID {
  1: string email;
}

enum Gender {
  MALE = 1, FEMALE = 2
}


struct PersonProperties {
  1: required string name;
  2: required i16 age;
}

struct Person {
  1: PersonID id;
  2: PersonProperties properties;
}