Code Structure Notes
====================

The React markup looks like

```tsx
import {Hint} from "../react-autocomplete-hint";

…

<div aria-labelledby={name} className={cc("rti--container", RTIContainer)}>
    {tags.map(tag => (
        <Tag key={tag} text={tag} remove={onTagRemove} />
    ))}
    <Hint options={suggestions} allowTabFill={true}>
        <input
            className={cc("rti--input", RTIInput)}
            type="text"
            name={name}
            placeholder={placeHolder}
            onKeyDown={handleOnKeyUp}
            onBlur={onBlur}
    />
    </Hint>
</div>
```

Notice that the `Hint` component is used to provide the autocomplete
functionality. The `Hint` component is a wrapper around the `react-autocomplete`
component. The `Tag` component is a wrapper around the `react-tag` component.

Perhaps the best way to add a dropdown is to put it in the `Hint` component,
which is implemented in `react-autocomplete-hint.tsx`.

react-autocomplete-hint.tsx
---------------------------

The HTML in this component resolves to a filler span followed by an input element
that has `className="rah-hint"`. Our dropdown could be a div that follows the
input element, populated by any matches.

Matching logic is provided by a `getMatch()`
function, invoked by `setHintTextAndId(string)`. This last `setHintTextAndId()`
function is used in `handleOnFill()` and a few other event handlers:
`onChange()`, `onFocus()`, and `onBlur()`.

The `getMatch()` function is designed to only give the first matching result.
We need to change it to return all matching results. For existing uses, 
`setHintTextAndId()` can just pluck the first result. For our dropdown, we can
use the full result set or slice it to the first few results.

Right now, the React state has a `hint` property which is a string, distinct from
the `match` property, which can be a string or an IHintOption interface object.
Both of these properties are based on a single match to the `options` property
that is passed in at the top level.
