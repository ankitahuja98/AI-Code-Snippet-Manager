import useAutocomplete from "@mui/material/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { useTheme } from "../Context/ThemeContext";

const Root = styled("div")<{ themeMode: string }>(({ themeMode }) => ({
  color: themeMode === "dark" ? "#eee" : "rgba(0,0,0,0.85)",
  fontSize: "14px",
}));

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  font-size: 1rem;
  font-weight: 600;
`;

const InputWrapper = styled("div")<{ themeMode: string }>(({ themeMode }) => ({
  width: "350px",
  border: `1px solid ${themeMode === "dark" ? "#555" : "#d9d9d9"}`,
  backgroundColor: themeMode === "dark" ? "#1e1e1e" : "#fff",
  borderRadius: "4px",
  padding: "1px",
  display: "flex",
  flexWrap: "wrap",
  "&:hover": {
    borderColor: "#40a9ff",
  },
  "&.focused": {
    borderColor: "#40a9ff",
    boxShadow: "0 0 0 2px rgb(24 144 255 / 0.2)",
  },
  "& input": {
    backgroundColor: themeMode === "dark" ? "#1e1e1e" : "#fff",
    color: themeMode === "dark" ? "#fff" : "rgba(0,0,0,.85)",
    height: "30px",
    padding: "4px 6px",
    width: "0",
    minWidth: "30px",
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
  },
}));

const tagColors = [
  "#e0f7fa", // light cyan
  "#fce4ec", // pink
  "#e8eaf6", // indigo light
  "#f3e5f5", // lavender
  "#fff3e0", // orange pastel
  "#e8f5e9", // green pastel
  "#f0f4c3", // light lime
  "#f1f8e9", // mint
  "#f9fbe7", // lemon
  "#ede7f6", // soft purple
  "#e3f2fd", // light blue
  "#fbe9e7", // coral tint
  "#f9fbe7", // creamy yellow
  "#edeef0", // very soft gray
];

const getColorForTag = (tag: TagOptionType) => {
  const index = tag.id % tagColors.length;
  return tagColors[index];
};

const StyledTag = styled("div", {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{ bgcolor: string }>(({ bgcolor }) => ({
  display: "flex",
  alignItems: "center",
  height: "24px",
  margin: "2px",
  lineHeight: "22px",
  backgroundColor: bgcolor,
  border: "1px solid #b5b5b5",
  borderRadius: "2px",
  padding: "0 4px 0 10px",
  "& span": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "#333",
  },
  "& .tag-close-icon": {
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px",
    color: "#333",
    "&:hover": {
      color: "red",
    },
  },
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: "350px",
  margin: "2px 0 0",
  padding: 0,
  position: "absolute",
  left: "50px",
  listStyle: "none",
  backgroundColor: "#fff",
  overflow: "auto",
  maxHeight: "250px",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgb(0 0 0 / 0.15)",
  zIndex: 10,
  "& li": {
    padding: "5px 12px",
    display: "flex",
    alignItems: "center",
    "& span": {
      flexGrow: 1,
    },
    "& svg": {
      color: "transparent",
    },
  },
  "& li[aria-selected='true']": {
    backgroundColor: "#fafafa",
    fontWeight: 600,
    "& svg": {
      color: "#1890ff",
    },
  },
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: "#e6f7ff",
    cursor: "pointer",
    "& svg": {
      color: "currentColor",
    },
  },
}));

export interface TagOptionType {
  id: number;
  name: string;
}

interface AutocompleteTagsProps {
  value: TagOptionType[];
  onChange: (newTags: TagOptionType[]) => void;
  options: TagOptionType[];
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function AutocompleteTags({
  value,
  onChange,
  options,
}: AutocompleteTagsProps) {
  const { theme, toggleTheme } = useTheme();

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "autocomplete-tags",
    multiple: true,
    options,
    getOptionLabel: (option) => option.name,
    isOptionEqualToValue: (option, value) => option.id === value.id,
    filterOptions: (options, { inputValue }) =>
      options.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      ),
    value,
    onChange: (_event, newValue) => {
      onChange(newValue);
    },
  });

  return (
    <div style={{ position: "relative" }}>
      <Root themeMode={theme}>
        <div
          {...getRootProps()}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label {...getInputLabelProps()} style={{ marginRight: "10px" }}>
            Tags:
          </Label>
          <InputWrapper
            ref={setAnchorEl}
            themeMode={theme}
            className={focused ? "focused" : ""}
          >
            {value.map((option, index) => {
              const tagProps = getTagProps({ index });
              const bgColor = getColorForTag(option); // 🔥 assign color

              return (
                <StyledTag key={option.id} bgcolor={bgColor}>
                  <span>{capitalize(option.name)}</span>
                  <CloseIcon
                    onClick={tagProps.onDelete}
                    className="tag-close-icon"
                  />
                </StyledTag>
              );
            })}
            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 && (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });
              return (
                <li {...optionProps}>
                  <span>{capitalize(option.name)}</span>
                  <CheckIcon fontSize="small" />
                </li>
              );
            })}
          </Listbox>
        )}
      </Root>
    </div>
  );
}
