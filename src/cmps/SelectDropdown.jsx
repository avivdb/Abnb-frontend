import React, { Component } from 'react'
import Select from 'react-select'

class SelectDropdown extends Component {
    state = {
        selectedOption: null
    }

    setValue = selectedOption => {
        this.setState({ selectedOption })
        console.log('Option selected:', selectedOption)
    }

    render() {
        const options = [
            { id: 1, name: 'Credit or debit card' },
            { id: 2, name: 'Google Pay' },
        ]

        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                paddingBlock: "0.5rem",
                boxShadow: state.isFocused ? 'none' : null,
                borderRadius: '10px',
                borderColor: '#cdcdcd',
                fontFamily: "cereal-light",
                '&:hover': {
                    borderColor: '#cdcdcd',
                    cursor: 'pointer',
                },
            }),
            menu: (provided) => ({
                ...provided,
                zIndex: 3,
                boxShadow: 'none',
                borderRadius: '10px',
                overflow: "hidden",
                border: this.state.isSelected? "0.5px solid #cdcdcd" : "0.5px solid #cdcdcd"
            }),
            option: (provided, state) => ({
                ...provided,
                fontFamily: "cereal-light",
                backgroundColor: state.isSelected ? 'white' : 'white',
                color: state.isSelected ? 'black' : 'black',
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                    color: 'black',
                },
            }),
            placeholder: (provided) => ({
                ...provided,
                color: 'black',
            }),
            dropdownIndicator: (provided) => ({
                ...provided,
                color: 'black',
            }),
            indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: 'white'
            }),
        };

        return (
            <Select
                options={options}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                onChange={this.setValue}
                value={this.state.selectedOption}
                placeholder={options[0].name}
                styles={customStyles}
            />
        )
    }
}

export default SelectDropdown


