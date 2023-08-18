import { Fragment, useState } from "react";
import deptList from '../utils/departmentList.json'
import { Checkbox, Collapse, FormControlLabel, IconButton, ListItem } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';


const DepartmentComp = () => {
    const initialCheckedItems: { [key: string]: { [key: string]: boolean } } = {};
    deptList.forEach(({ department, sub_departments }) => {
        initialCheckedItems[department] = {};

        sub_departments.forEach(subDepartment => {
            initialCheckedItems[department][subDepartment] = false;
        });
    });
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: { [key: string]: boolean } }>(initialCheckedItems);
    const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
    const handleDepartmentToggle = (department: string) => () => {
        setCheckedItems(prevState => {
            const newState = { ...prevState };
            const subDepartmentStates = deptList.find((d) => d.department === department)?.sub_departments;
            if (subDepartmentStates) {
                const allSubDepartmentsChecked = subDepartmentStates.every(subDept => newState[department]?.[subDept]);
                subDepartmentStates.forEach(subDept => {
                    newState[department][subDept] = !allSubDepartmentsChecked;
                });
            }
            return newState;
        });
    };
    const handleSubDepartmentToggle = (department: string, subDepartment: string) => () => {
        setCheckedItems(prevState => ({
            ...prevState,
            [department]: {
                ...prevState[department],
                [subDepartment]: !prevState[department]?.[subDepartment]
            }
        }));
    };
    const toggleDepartmentExpansion = (department:string) => {
        setExpandedDepartments(prevDepartments => {
            if (prevDepartments.includes(department)) {
                return prevDepartments.filter(dep => dep !== department);
            } else {
                return [...prevDepartments, department];
            }
        });
    };
    return (
        <Fragment>
            <h2>Department Cateogory</h2>
            {
                deptList.map(({ department, sub_departments }) =>
                    <div key={department}>
                        <IconButton aria-label="expand" onClick={() => toggleDepartmentExpansion(department)}>
                            <RemoveIcon />
                        </IconButton>
                        <FormControlLabel
                            label={`${department} (${sub_departments.length})`}
                            control={
                                <Checkbox
                                    indeterminate={Object.values(checkedItems[department] || {}).some(Boolean) &&
                                        !Object.values(checkedItems[department] || {}).every(Boolean)}
                                    checked={Object.values(checkedItems[department] || {}).every(Boolean)}
                                    onChange={handleDepartmentToggle(department)}
                                />
                            }
                        />

                        <Collapse in={expandedDepartments.includes(department)} timeout="auto" unmountOnExit>
                                {sub_departments.map(subDepartment => (
                                    <ListItem key={subDepartment} style={{ paddingLeft: 40 }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checkedItems[department]?.[subDepartment] || false}
                                                    onChange={handleSubDepartmentToggle(department, subDepartment)}
                                                />
                                            }
                                            label={subDepartment}
                                        />
                                    </ListItem>
                                ))}
                        </Collapse>
                    </div>)
            }
        </Fragment>
    )
}

export default DepartmentComp