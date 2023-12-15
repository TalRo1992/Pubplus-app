  export interface CardProps {
    title: string;
    content: any;
    customClass?: string;
  }

  export interface TextFieldProps {
    placeholder: string;
    textType: string;
    value: string | number;
    handleChanges: any;
  }

  export interface ActionButtonProps {
    handleClick: () => void,
    title: string
  }

  export interface SearchBarProps {
    onSearch: (term: string) => void;
}

export interface MultiSelectCheckboxProps {
  items: string[];
  onChange: (selectedItems: string[]) => void;
}

export type MyComponentProps = {
  value: string;
  user: any;
  snackbar: object;
  isAuthenticated: boolean;
  setFields: React.Dispatch<React.SetStateAction<any>>;
  };