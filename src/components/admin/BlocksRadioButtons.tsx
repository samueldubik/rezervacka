export const BlocksRadioButtons = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <label htmlFor="block1" className="cursor-pointer">
          A
        </label>
        <input type="checkbox" name="A" value="block1" id="block1" />
      </div>

      <div className="flex flex-col items-center">
        <label htmlFor="block1" className="cursor-pointer">
          B
        </label>
        <input type="checkbox" name="A" value="block1" id="block1" />
      </div>

      <div className="flex flex-col items-center">
        <label htmlFor="block1" className="cursor-pointer">
          C
        </label>
        <input type="checkbox" name="A" value="block1" id="block1" />
      </div>

      <div className="flex flex-col items-center">
        <label htmlFor="block1" className="cursor-pointer">
          D
        </label>
        <input type="checkbox" name="A" value="block1" id="block1" />
      </div>
    </div>
  );
};
