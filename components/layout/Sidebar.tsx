import React from "react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-[17vw] card-bg p-6 h-[calc(100vh-2rem)] flex flex-col justify-between rounded-md sticky top-4">
      <div>
        <div className="w-full flex items-center justify-center">
          <img src="/img/Logo_Violet.png" alt="Logo" className="mb-10 w-32" />
        </div>
        <nav className="space-y-4 w-full">
          <Link
            key="/direction"
            href="/direction"
            className="block text-gray-700 font-os text-sm">
            Tableau de bord
          </Link>
          <hr className="solid bg-light-purple h-[2px]"></hr>
          <p className="font-anton text-md text-purple">Operations</p>
          <Link
            key="/personal"
            href="/personnel"
            className="block text-gray-700 font-os text-sm">
            Personnel
          </Link>
          <Link
            key="/"
            href="/"
            className="block text-gray-700 font-os text-sm">
            Feuille de temps
          </Link>
          <Link
            key="/"
            href="/"
            className="block text-gray-700 font-os text-sm">
            Approbation
          </Link>
          <hr className="solid bg-light-purple h-[2px]"></hr>
          <p className="font-anton text-md text-purple">Administration</p>
          <Link
            key="/clients"
            href="/clients"
            className="block text-gray-700 font-os text-sm">
            Clients
          </Link>
          <Link
            key="/contracts"
            href="/contrats"
            className="block text-gray-700 font-os text-sm">
            Contrats
          </Link>
          <Link
            key="/coworkers"
            href="/collaborateurs"
            className="block text-gray-700 font-os text-sm">
            Collaborateurs
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-3">
        <img
          src="/workers/Thibaut_Triki.png"
          alt="Thibaut TRIKI"
          className="w-12 h-12 rounded-sm"
        />
        <div>
          <p className="font-medium">Thibaut TRIKI</p>
          <p className="text-[10px] text-purple">Head of Strategy</p>
        </div>
      </div>
    </aside>
  );
}
