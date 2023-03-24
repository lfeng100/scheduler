import React from "react";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function FilterArea(props) {
  return (
    <div>
        <Container maxWidth="100%">
            <Stack direction="row" spacing={2}>
                <h1>Filters:</h1> 
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.statusFilter}
                    label="Status"
                    onChange={props.handleStatusFilter}
                    >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.dateFilter}
                    label="Date"
                    onChange={props.handleDateFilter}
                    >
                        <MenuItem value="cdd">Closest Due Date</MenuItem>
                        <MenuItem value="fdd">Furthest Due Date</MenuItem>
                        <MenuItem value="mrc">Most Recently Created</MenuItem>
                        <MenuItem value="lrc">Least Recently Created</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Tags</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.tagsFilter}
                    label="Tags"
                    onChange={props.handleTagsFilter}
                    >
                        <MenuItem value="na"><em>N/A</em></MenuItem>
                        {props.userTags.map((tag) => {
                          return (
                            <MenuItem
                              id={tag.tag_id}
                              key={tag.tag_id}
                              value={tag.tag_id}>
                                {tag.tag_name}
                            </MenuItem>
                          );
                        })}
                        <MenuItem value="none">No Tags</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={props.resetFilters} variant="outlined">Reset Filters</Button>
            </Stack>
        </Container>
    </div>
  );
}

export default FilterArea;
