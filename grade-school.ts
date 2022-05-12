type Roster = {
  [key: number]: string[];
};
// Or...: type Roster = Record<number, string[]>;
type GradeTuple = [string, string[]];

export class GradeSchool {
  private studentsByGrade: Roster = {};
  private static deepClone(object: unknown) {
    const objectAsJson = JSON.stringify(object);
    const parsedJsonString = JSON.parse(objectAsJson);
    return parsedJsonString;
  }

  roster() {
    return GradeSchool.deepClone(this.studentsByGrade);
  }

  private removeStudentFromRoster(studentName: string) {
    const removeStudentFromRoster =
      (studentName: string) =>
      (studentsByGrade: Roster, [grade, students]: GradeTuple) => {
        studentsByGrade[+grade] = students.filter(
          (student) => student !== studentName
        );
        return studentsByGrade;
      };

    this.studentsByGrade = Object.entries(this.studentsByGrade).reduce(
      removeStudentFromRoster(studentName),
      {}
    );
  }

  add(studentName: string, grade: number) {
    this.removeStudentFromRoster(studentName);

    const studentsByThisGrade = this.studentsByGrade[grade];
    this.studentsByGrade[grade] = studentsByThisGrade
      ? [...studentsByThisGrade, studentName].sort()
      : [studentName];
  }

  grade(grade: number) {
    if (this.studentsByGrade[grade]) {
      return GradeSchool.deepClone(this.studentsByGrade[grade].sort());
    } else {
      return GradeSchool.deepClone([]);
    }
  }
}
