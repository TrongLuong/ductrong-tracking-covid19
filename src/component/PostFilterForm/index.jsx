import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRef } from 'react';
 

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
    listCountry: PropTypes.array,

};
PostFilterForm.defaultProps = {
    onSubmit: null,
    listCountry: [],
}


function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchItems, setSearchItems] = useState('');
    // const { listCountry } = props;
    // console.log({ listCountry });
    // taoj gia object giu nguyen gia tri sau moi lan render
    const typingTimeOutRef = useRef(null);

    function handleSearch(event) {
        setSearchItems(event.target.value);
        if (!onSubmit) return;
        // neu co timeOut, clear xong set Timeout moi
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }
        // doi 300ms moi submit, 
        typingTimeOutRef.current = setTimeout(() => {
            const formValues = {
                searchItems: event.target.value,
            }
            onSubmit(formValues);
        }, 500);

    }
    return (
        <div style={{ width: 500 }}>
            <form>
                Search: <input  
                        placeholder="Country name" type="text" value={searchItems} onChange={handleSearch}/>  Default: Vietnam 
            </form>
            {/* <Autocomplete

                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={listCountry.map((option) => option.country)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
                value={searchItems} onChange={handleSearch}
            /> */}

        </div>
    );
}

export default PostFilterForm;