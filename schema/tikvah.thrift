union PersonID {
  1: string email;
}

enum Gender {
  MALE = 1, FEMALE = 2
}


union PersonPropertyValue {
  1: string name;
  2: i16 age;
  3: Gender gender;
}

struct PersonProperty {
  1: PersonID id;
  2: PersonPropertyValue property;
}

union DataUnit {
    1: PersonProperty person_property;
}