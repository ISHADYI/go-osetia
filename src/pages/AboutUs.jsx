import React from "react";
import Container from "../components/ui/Container";
import { div } from "framer-motion/client";


export function AboutUs(){
  return (
    <div>
      <Container>
        <div className="text-center mb-10">
          <h1 className="title-underline text-black">
            О нас
          </h1>
        </div>
      </Container>
    </div>
  );
}