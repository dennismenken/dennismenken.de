---
date: 2026-03-03
description: Wie mein Mobilfunkanbieter in 42 Minuten mein Kundenkonto zerlegt und welche architektonischen Lektionen dieses Systemversagen offenbart.
---

# Systemversagen im Kundenservice: Wenn schlechte Prozesse teurer sind als gute Architektur

Letzte Woche hat mich mein Mobilfunkanbieter angerufen. Es war eine klassische Vertriebskampagne und die Mitarbeiterin versprach mir einen besseren Tarif sowie das neue iPhone 17 Pro. Die Ersparnis lag bei satten 32 EUR pro Monat. Der Haken an der Sache war die technische Umsetzung. Da ich Bestandskunde bin, sah ihr System keinen einfachen Wechsel vor. Ihre Lösung war kreativ. Ich sollte meinen alten Vertrag kündigen, die Rufnummer kurzzeitig zu einem Prepaidanbieter portieren und dann als Neukunde zurückkehren. Mir war sofort klar, dass hier die Provision der Treiber war. Ich stimmte trotzdem zu.

Ab diesem Punkt eskalierte die Systemarchitektur des Anbieters völlig.

Was dann folgte, war ein Paradebeispiel für dysfunktionale Prozesse und katastrophales State Management. Meine Kündigung per App wurde nur als Vormerkung gespeichert. Ich musste bei der Retention Hotline anrufen. Der Mitarbeiter dort besprach sich mit seinem Teamleiter und vergaß, sich stummzuschalten. Der neue Plan war nun, den Neuvertrag zu stornieren und den alten Vertrag doch anzupassen. Meine Rufnummer sollte bleiben. Die Bandaufnahme für den Vertrag musste zweimal gestartet werden, weil man mir ein oranges statt eines tiefblauen iPhones unterschieben wollte. 

Dann begann das eigentliche Chaos. Während ich noch versuchte, die Portierung beim Prepaidanbieter CallYa zu stoppen, bekam ich eine E Mail. Mein Auftrag könne nicht ausgeführt werden. Ich rief wieder die Hotline an. Der nächste Mitarbeiter sah meine Daten, konnte aber wegen der aktiven Kündigungsvormerkung nichts tun. Ich setzte die Vormerkung live in der App wieder rein, wurde weitergeleitet und landete bei einer Kollegin ohne jeglichen Kontext. Diese konnte nun nichts tun, eben weil die Vormerkung aktiv war. Ich entfernte sie wieder. Nach 42 Minuten brach die Leitung ab. Nichts war gelöst.

Zehn Minuten später in der Warteschleife und beim vierten Anlauf hatte ich eine Mitarbeiterin am Apparat, die nach Eingabe meiner Service PIN nur ein fassungsloses "What the fuck" herausbrachte. Sie sah ein komplett zerschossenes Kundenkonto. Da sie keine Berechtigungen hatte, eröffnete sie ein Ticket mit hoher Priorität. Zwei Stunden später bekam ich die Versandbestätigung für ein zweites iPhone 17 Pro. Eins liegt hier bereits aus dem stornierten Neuvertrag. Nun kommt noch eins für einen Auftrag, der angeblich nicht ausgeführt werden kann.

Als lösungsorientierter Mensch betrachte ich so etwas nicht nur als nervig. Ich sehe ein massives Architekturproblem. Es gibt Unmengen an manueller Arbeit in diesem Zyklus und die Fehlerkosten sind astronomisch. Die Lösung für dieses Chaos ist auf Systemebene eigentlich sehr simpel.

Erstens gehört die Betreuung von Bestandskunden niemals in die Hände von provisionsgetriebenen Callcentern. Bestandskundenpflege erfordert geschultes Personal mit dem Ziel der Kundenbindung. Ein System, das den Berater zwingt, den Kunden in eine Neukundenmaske zu zwängen, ist ein fundamentaler architektonischer Fehler.

Zweitens fehlt ein grundlegendes Monitoring für Datenkonflikte. Spätestens wenn innerhalb weniger Tage ein Neuvertrag storniert wird, eine Kündigung vorgemerkt und wieder gelöscht wird und unzählige Agenten den Datensatz öffnen, muss das System eine Anomalie erkennen. Das Ticket hätte vollautomatisch eskalieren müssen.

Drittens ist das Fehlen eines Session Managements bei Gesprächsabbrüchen unverzeihlich. Wenn ein Routingsystem einen Anruf verliert, muss es einen Fallback Mechanismus geben. Ein automatischer Rückruf oder eine Injection in den Vermittlungsfluss zur direkten Zuweisung an denselben Agenten sind etablierte Standards.

Viertens ist die fehlende Kontextübergabe ein Armutszeugnis. Die Agenten wussten bei jedem Transfer nicht, worum es geht. Hier hätte man längst eine KI zur Qualifizierung und Zusammenfassung vorschalten können. Bewährte Pattern für exakt solche Workflows existieren im Systemdesign seit Jahren.

Am Ende zahlt das Unternehmen nun mehrfach. Retouren für teure Hardware, blockierte Hotlinekapazitäten, frustrierte Kunden und sinnlose Arbeitszeit. Gute Architektur fängt eben nicht beim Code an. Sie beginnt beim ganzheitlichen Verstehen des Problems.