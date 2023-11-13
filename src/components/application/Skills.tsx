import { SkillsProps, skillsData } from "../skills/Skills.types";
export const Skills = () => {
  return (
    <ul>
      {skillsData?.map((item: SkillsProps) => (
        <li key={item.id}>
          {item.id}:{item.skill_name}
        </li>
      ))}
    </ul>
  );
};
