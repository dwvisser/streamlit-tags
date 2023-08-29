// This goes inside the component. Styles of course are necessary on the classes to render nicely.

// As seen on https://www.youtube.com/watch?v=Jd7s7egjt30

const onSearch = (searchTerm) => {
    setValue(searchTerm);  // react state
    console.log("searchTerm:", searchTerm);
}

return (
    <div className="dropDown">
        {data.filter(item => {
            if (!value) return false;
            // I modified this to be a little better than .startsWith()
            // I also added the replace(" ", "-") to make it more robust
            const full_name = item.full_name.toLowerCase().replace(" ", "-");
            const search_term = value.toLowerCase();
            return full_name !== search_term &&
              full_name.includes(search_term.replace(" ", "-"));
        })
        .slice(0, 10)
        .map((item) => (
            <div
              onClick={() => onSearch(item.full_name)}
              className="dropdown-row"
              key={item.full_name}> {item.full_name}
            </div>
        ))}
    </div>
);


// in react-autocomplete-hint, data is called "options"