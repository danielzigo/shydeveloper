import React from "react";
import Modal from "@/components/Modal";
import Image from "next/image";

type GameRulesProps = {
  open: boolean;
  advanced: boolean;
  setopen: () => void;
  positionRelative?: boolean;
};

const GameRules = ({ open, advanced, setopen, positionRelative }: GameRulesProps) => {
  return (
    <Modal isOpen={open} onClose={setopen} positionRelative={positionRelative}>
      <div className="relative w-fit h-fit flex flex-col items-center bg-[#2E0854] p-8 rounded-lg"> {/** bg-black/40 */}
        <h2 id="modal-title" className="text-2xl font-semibold font-game my-8">
          {advanced ? "Advanced Mode Rules" : "Normal Mode Rules"}
        </h2>
        {advanced ? (
          <Image
            src="/assets/game/image-rules-bonus.svg"
            alt="Image showing the game rules for advanced mode - rock beats scissors, scissors beats paper, and paper beats rock, rock beats lizard, and lizard beats spock, spock beats scissors, and scissors beats lizard, lizard beats paper, and paper beats spock, spock beats rock"
            width={500}
            height={500}
            style={{
              width: 'fit-content',
              height: 'auto',
            }}
          />
        ) : (
          <Image
            src="/assets/game/image-rules.svg"
            alt="Image showing the game rules for normal mode - rock beats scissors, scissors beats paper, and paper beats rock"
            width={500}
            height={500}
            style={{
              width: 'fit-content',
              height: 'auto',
            }}
          />
        )}

        <div className="mt-12">
          <p className="text-sm font-semibold">Note:</p>
          <p className="text-sm">
            You could also press ESC or click outside the modal content to
            close.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default GameRules;
