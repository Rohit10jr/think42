const DynamicFormSection = ({ title, fields, onChange, sectionKey }) => (
    <Section title={title}>
      {fields.map((field, index) => (
        <div key={index}>
          <FormInput
            label={`${field.label} ${index + 1}`}
            type={field.type}
            id={`${sectionKey}-${index}`}
            value={field.value}
            onChange={(e) => onChange(e, sectionKey, field.name, index)}
          />
        </div>
      ))}
    </Section>
  );
  