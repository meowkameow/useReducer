import { TextField, Button, Checkbox } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ onAdd }) => {
    const [inputValue, setInputValue] = React.useState("");
    const [checked, setChecked] = React.useState(false);

    const onClickAdd = ()=>{
        onAdd(inputValue, checked);
        setInputValue('');
        setChecked(false);
    }

    return (
        <div className="field">
            <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="checkbox"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
            />
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите текст задачи..."
                variant="standard"
                fullWidth
            />
            <Button onClick={onClickAdd}>
                <AddIcon />
            </Button>
        </div>
    );
};
