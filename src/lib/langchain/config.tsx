// src/lib/langchain/config.ts
// import { ChatVertexAI } from "langchain/chat_models/googlevertexai";
// import { VertexAIEmbeddings } from "langchain/embeddings/googlevertexai";
import { VertexAI } from "@langchain/google-vertexai";
import { PromptTemplate } from "@langchain/core/prompts";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Base model configuration
export const createGeminiTextModel = (temperature = 1, maxOutputTokens = 8192) => {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-exp",
  });
};

// Prompt Templates
export const PROMPT_TEMPLATES = {
  taskExtraction: new PromptTemplate({
    template: `You are an AI assistant helping extract customer's technical questions from a conversation between a Google Cloud Customer Engineer (CE) and a customer.
Analyze the transcript and identify the core technical questions, needs, or pain points the customer expresses or implies. Focus on questions that highlight the customer's technical understanding and requirements regarding Google Cloud.
Always focus on the specific technical questions that can be answered based on the GCP documentation.

Format the output as a JSON array of tasks, where each task has:
- description: The customer's technical question, phrased as a concise question from the customer's perspective.

Meeting Transcript: Google Cloud & Sentante – 2024/10/30 08:55 EET – Transcript
Attendees
Christina Halemba, Daniel Stamer, Edvardas Satkauskas, Edvardas Satkauskas's Presentation, Hohler Zahn (de-ber-tsky2), Phone Room 2 (lt-vno-ant17), Rasa Švelnikaitė-Pieslikė, Tomer Frieder, Vilius Dambrauskas
Transcript
Phone Room 2 (lt-vno-ant17): Oops.
Phone Room 2 (lt-vno-ant17): 
Edvardas Satkauskas: Get that problem. running.
Phone Room 2 (lt-vno-ant17): Bye-bye now.
Phone Room 2 (lt-vno-ant17): problems. …
Vilius Dambrauskas: Thank you.
Christina Halemba: Good morning. Wonderful.
Phone Room 2 (lt-vno-ant17): hi Christina.
Phone Room 2 (lt-vno-ant17): 
Vilius Dambrauskas: I think
Phone Room 2 (lt-vno-ant17): So just I think one minute and we can start because we have two customer engineers joining our call today. so Krishna is one of them.
Edvardas Satkauskas: Good morning.
Phone Room 2 (lt-vno-ant17): While we are waiting for our colleagues.
Hohler Zahn (de-ber-tsky2): Hey, good morning.
Phone Room 2 (lt-vno-ant17): Yeah here we are. So yeah I think we can start. So we have Danielle and Christina joining from our end who are customer engineers and at shortly about this meeting. So as I mentioned in the email hi timer we have selected some startups here in Baltics which we would like to better understand how you do business, what are the challenges and like to see if we as a Google can help you in any way.
00:05:00
Phone Room 2 (lt-vno-ant17): we are from cloud team but we have colleagues in ads in workspace and other where sometimes we collaborate together to help for the customer. So Tommer led this kind of program in Israel. So that's why he's joining and helping us to try to replicate the success here in Bodics because we have a lot of startups and a lot of potential here right Tammer. So yeah, so shortly this is a team who wants to understand your business and talk about your needs.
Phone Room 2 (lt-vno-ant17): 
Phone Room 2 (lt-vno-ant17): We have a bit of analysis and discovery what you do but it would be amazing if you can introduce yourself and tell a bit about your business case and what you're doing right now…
Edvardas Satkauskas: Re you want to start with your intro.
Phone Room 2 (lt-vno-ant17): because what we can read in the internet another thing is what happening internally in the company
Vilius Dambrauskas: I think you can do that in better way.
Edvardas Satkauskas: So, he's our CTO. the person who is responsible for technical implementation of the robotic system which actually works very well and I'm a CEO and one of co-founders of the company my background is business and management but I work with medtech for more than 20 years now and been involved in very different field started in orthopedics, then ultrasound based neurody diagnostics, then we developed quite a bunch of different medtech technologies for our external customers and now for six years measant robotic system for endovvascular intervention.
Edvardas Satkauskas: 
Edvardas Satkauskas: So you're right is we have very little information about us and it's actually quite old and we are now in the process to design a new website which would reflect what we do and why in better way. the current one was created four years ago maybe three when we did not even have a final product yet. at this moment of time we have a fully functional system which was tested in number of different clinical settings be it cadaavver testing,…
Phone Room 2 (lt-vno-ant17): Oops. Yeah,…
Edvardas Satkauskas: animal testing in different places in the world and last August we completed our first inhuman clinical trial. so this robotic system is now treating patients and is in process to be certified for peripheral vascular intervention. So I don't know I can maybe share some slides with you so you can better understand how it looks and what we do.
Phone Room 2 (lt-vno-ant17): amazing. Because I saw on LinkedIn that you shared about the first case in RIA on human services like…
Edvardas Satkauskas: Mhm. So it's just checking out.
Phone Room 2 (lt-vno-ant17): where you already have a contract and your robotic system is in use or you just did one case and that's it.
Phone Room 2 (lt-vno-ant17): Mhm. Please.
Edvardas Satkauskas: So it is a clinical trial. it's not our customer. It is an independent clinical site with independent investigators are performing the procedures according to the agreed and approved protocol on very strict documentation. we had to go over it is a very strictly regulated industry metac in general and clinical trials in particular because you cannot just test in humans whatever you want.
Edvardas Satkauskas: so there are things that you have to complete before things that you have to prepare and only then you are allowed to under strict supervision to do clinical cases first clinical cases and this validation process is necessary u to get C mark here in Europe for us and for FDA in the US we'll need to repeat similar study in the US basically showing that we can operate in a clinical setting in the US side as well. So can run through the slides real quickly and please feel free to ask any questions if you have.
00:10:00
Edvardas Satkauskas: So in a ve very brief intro here that we are talking about endovvascular interventions meaning guide wires, catheterss, stances, balloons, everything what goes inside the blood vessels and doctors insert those allocated devices into the vascular system and navigate them needed segment of the artery where the treatment is needed and that treatment can be very different. You either need to blood open the artery or close the artery and stop the blood flow or many different things can be done place a stent inflate a balloon close the aneurysm and etc.
Edvardas Satkauskas: And this is a minimally invasive procedure which is very beneficial for patient. You only have very very small access through the artery and then under X-ray imaging doctors navigate those devices to needed vascular segment. And this technology was invented back in 70s…
Phone Room 2 (lt-vno-ant17): Please.
Edvardas Satkauskas: but in the 80s it became a rather standard of care and since then quite a lot of things changed. So as in this picture, we no longer use mechanical typewriters. We've gone digital a long time away ago. thousands of endovvascular devices were developed. But the process of how we deliver this type of treatment, it's still the same as it was in the very beginning. So doctor standing next to a running X-ray source and manually manipulates those instruments inserted in the patient. So now we know that X-ray causes DNA damage, cancer, doctors and nurses they wear lead aprons to protect themselves from X-ray exposure but then they develop back pain, orthopedic injuries because those lead aprons are heavy.
Edvardas Satkauskas: so the procedure itself is very dependent on skills of the operator and specifically in many different indications we have lack of skilled tab we have errors we have many other things that come together with basically a manual procedure and we are targeting to change this way this treatment is delivered into basically a digital process and what we're talking about from intervention from the indication point of view and the vascular interventions are the gold standard for treating most critical conditions. So those are heart attacks, strokes, peripheral artery disease and even some types of cancer are treated this way.
Edvardas Satkauskas: more than six million procedures each year done for those cases in western world if we take globally that would be a much much bigger number. So this is a huge problem to solve and robotics can definitely help here. And if we think about robotics in many different fields, we can see how the robotics can help in different applications. And you very know the cases when robotics are used for accuracy.
Edvardas Satkauskas: 
Edvardas Satkauskas: So you need accuracy of manipulation when you need motion scaling for extreme precision when you need to avoid hazardous work environment or even when you need to be sorry press button or when you need to have a stable positioning of the devices and stabilize them and even in medical field each of those features are very commonly used and…
Phone Room 2 (lt-vno-ant17): Oops.
00:15:00
Edvardas Satkauskas: any of those is sufficient for robots to exist in this world because they help to do things faster, safer. But when we talk about endovvascular, we actually have to check all the boxes. We need to be accurate, avoid hazardous work environment, basically take operator away and we need to be stable and we have developed this system. So It is the first ever system that allows entire procedure to be performed remotely and as in this demonstration you can see remotely meaning from the next room or agent room.
Edvardas Satkauskas: but that control room may as well be in a very different hospital. So in the future physicians will be able to connect from their control station into any hospital and control the robot from distant location and perform entire procedure using this system to patients who are in different hospital. And in order to do that you have to be able to perform entire procedure robotically meaning that we from start to finish using robot entire procedure has to be done robotically and for this we have some requirements.
Edvardas Satkauskas: 
Edvardas Satkauskas: So first of all compatibility with needed devices and ability to manipulate three devices at a time and when we can do this we can do entire procedure and our system is designed in such a way that we are device agnostic. We can use any manufacturers and vascular devices that go inside the body and we also are ure agnostic. So we can do any diagnostic treatment procedures whatever is needed for that particular patient.
Phone Room 2 (lt-vno-ant17): Oops.
Edvardas Satkauskas: And the most important part is how we do this. So the interface between the doctor and a robot is while the same and the vascular devices that are routinely used in a clinical case. So basically the caster and guide caster a set of three devices is the physical interface for the doctor. And if the doctor pushes the guide wire in the cockpit here in control workstation, robot senses all the motions and replicates exact same movement inside the patient. If you rotate the catheter, the same thing happens there. But if there's resistance inside the patient, doctor can feel it here. So we have real time haptic force feedback…
Phone Room 2 (lt-vno-ant17): Oops.
Edvardas Satkauskas: which provides the same sensation for doctor as if he or she would be working manually next to a patient. And this is basically half of information that is available for doctor during the procedure. the other half being X-ray imaging. So they see an X-ray image basically a map where they navigate and also they have a feeling of what's happening with what's the resistance and our technology allows them to feel the resistance of the devices. So you basically are taking physician out of X-ray exposure and opening up possibilities to work completely remotely plus you give all the robotic accuracy precision. we have motion scaling feature the robot has six hands so we can hold any of the devices for you.
Edvardas Satkauskas: we have a very different work setup. So doctor is non-sterile as compared plus we have basically a digital record of entire procedure because this haptic force feedback wag it's not just a nice feature for doctor to feel but it's actual data of actual forces used during the procedure with specific devices and in each moment of time and when we pair it with x-ray imaging we have
Edvardas Satkauskas: a digital blueprint of entire procedure. Then we can slice this data in many different ways both for procedure improvement but also basically to create a super realistic training system for doctors to train on actual diseases, actual virtual cases. But also this data can be used to train the robot itself. So it would become more and more autonomous and could do more and more things on its own.
Edvardas Satkauskas: So in the future we leave basically this navigation to doctor but in the future the robot will be able to do quite a lot of things on its own and help to do procedure better fat to safer and with this we also open tea interventions and while doing procedures from different hospital is extremely important for cases like stroke because stroke patients they
00:20:00
Edvardas Satkauskas: have 3 hours to get their blood flow restored. otherwise their chances of getting treated or chances of good outcome decrease dramatically. So the difference between timely done procedure neurosctomy versus not in time or not done procedure at all is a lifelong disability. So now we transport the patients from hospital to hospital until they finally arrive to a comprehensive stroke center and the procedure is done. Instead of doing that we could connect to any of the hospitals that are not stroke ready and do the trobectomy right away. In this way help more patients and dramatically increase access to care but also outcomes for the patient.
Edvardas Satkauskas: 
Edvardas Satkauskas: And in real life it looks like this. So doctor is physically manipulating guide wires and catheterss guided by x-ray imaging and doing the same thing. It's super easy for the doctor because they already know how to do this. They spend years and years of training and it takes half an hour for them to start working with the patient with a system. And here we have many different things that I would not stop here. And so basically what we…
Phone Room 2 (lt-vno-ant17): Please.
Edvardas Satkauskas: what we are doing here is we are creating a platform for digital cathization operating room in the hospital. So now at stage one. We are empowering physician with teleaoperated robot system. Basically allowing them to work in safe environment in very different setup and reducing pain points that are currently existing in the procedure. But very soon we'll open the possibility to do tea interventions. And it's not far away.
Phone Room 2 (lt-vno-ant17): This guy.
Edvardas Satkauskas: We tested our system already operating on vascular model from villainous to konus 100 kilometers away. and then when we collect sufficient amount of data we'll use different tools including This is now a buzzword that everyone uses. when we started the six years ago that was not so popular to talk about this. but we designed this big hardware system basically to become a software company. So now we'll use this data to gradually train our system, improve our system and it will become more and more autonomous. So I mentioned thank you
Hohler Zahn (de-ber-tsky2): A quick question in front. First of all, this is amazing.
Phone Room 2 (lt-vno-ant17): Oops.
Hohler Zahn (de-ber-tsky2): I think this is fantastic what you're doing. you showed in one of the pictures how remote operations happens from the next room 4 meters away and then you just a minute ago said something about hundreds of kilometers.
Edvardas Satkauskas: 
Hohler Zahn (de-ber-tsky2): How critical is latency for this to work?
Edvardas Satkauskas: It is an excellent question.
Edvardas Satkauskas: Thank so latency is important here. but for robots we don't have huge amounts of data for the control of robots and village did a great job here to stay lean on the data that we send back and forth for haptic force feedback for X-ray imaging the data amounts are slightly larger but not slightly it's significantly larger but this is grayscale
Edvardas Satkauskas: images not very high resolution so latency here is important but also the procedure itself is not a very fast procedure so we have relatively slow movements inside the body this is an accurate slow procedure so we can live with quite big latency so procedure is still doable with significant latency if such exist exist. And if we take a look at best online server games where guys are shooting each other, online that for robot we can definitely work with such latencies no problem and for imaging those latencies can be way higher.
00:25:00
Edvardas Satkauskas: So in our test we just used the standard video transmissions here those have very significant latency but we were still able to do the procedure if we optimize everything. So it's absolutely doable and now we have u as in any other robotic surgery you can find different surgeries done from remote location from lap rocopy fields like soft tissue robots, hard tissue robots have been demonstrated to work from remote location but justification of need of that is
Edvardas Satkauskas: 
Edvardas Satkauskas: is somewhat not really convincing at least for me but for stroke cases it's definitely a need there because you really need to be so if you do the procedure in three hours that patient may walk back home as nothing happened if you don't that patient would stay disabled for the rest of the life so that's a huge need for such application in emerging cases.
Edvardas Satkauskas: So yeah, we did some clinical testing. Yeah.
Hohler Zahn (de-ber-tsky2): How do Thank you.
Hohler Zahn (de-ber-tsky2): Are you using the internet for this and how do you deal with network partitions so in case you would lose connectivity?
Edvardas Satkauskas: So we don't just let's be transparent here.
Phone Room 2 (lt-vno-ant17): Oops. What's happening?
Edvardas Satkauskas: We don't do the procedures remotely yet. So our two models now are connected basically with the local network connection. In our tests, we do this over standard internet. the clinically usable system that would enable teley interventions would require of course all the cyber security things in place but also some backup internet lines you use fiber optics plus 5G for backup or…
Phone Room 2 (lt-vno-ant17): 
Edvardas Satkauskas: something like this.
Phone Room 2 (lt-vno-ant17): Thank you Albert.
Phone Room 2 (lt-vno-ant17): It's very interesting to hear what you're doing and can you give a bit of understanding where are you right now with the business…
Phone Room 2 (lt-vno-ant17): because like you mentioned that you have some trials you going for FDA approval in the states. So how your pipeline or a plan for the next 12 months looks like
Edvardas Satkauskas: Yeah. …
Edvardas Satkauskas: metac is rather have very different timelines from, technology industry. So, 12 months is, very foreseeable in our case. So we are now preparing our technical file to submit for certification of the device here in so in half of next year we plan to have CMR and have first commercial installations here in Europe. mid this year we will start clinical trial in the US and this will be the last piece of data required to submit for FDA clearance and we definitely will submit for FDA until the end of next year and…
Phone Room 2 (lt-vno-ant17): 
Edvardas Satkauskas: depending on how it goes we'll have FDA clearance next early 26 Thanks.
Phone Room 2 (lt-vno-ant17): Okay.
Phone Room 2 (lt-vno-ant17): And how many robotic systems do you have right now? And how long does it take to scale if you have interest for I don't know from many hospitals institutions like how scalable and how fast you can be?
Edvardas Satkauskas: Scale, we can assemble robots, no problem. We have all the processes set up here. It's just a question of planning ahead. so now we have one system in the US. it actually will be demonstrated next week in Las Vegas in Viva Congress and end of the month in New York in wheat symposium. We have a few more systems here in Lithuania that are used for testing, demos and all different kind of stuff and we are assembling some more for first installations in Europe. So we currently don't see problem to meet the demand. it's not a consumer product.
00:30:00
Edvardas Satkauskas: 
Edvardas Satkauskas: It's a million-doll system that if you sell a hundred of them then it's quite a good result already and for us to assemble 100 systems if planned correctly it's not a huge problem but we also have a disposable component next to so each procedure requires a disposable set that it has to be sterile. It has contact with patient blood. So, it has to be changed per procedure.
Phone Room 2 (lt-vno-ant17): 
Edvardas Satkauskas: So, disposable cassettes. This is a different revenue stream per procedure.
Phone Room 2 (lt-vno-ant17): Okay, thank you so much for clarifying that.
Phone Room 2 (lt-vno-ant17): So actually commercialization should come in a few years ideally in your plan, right?
Edvardas Satkauskas: So commercialization is next we are already working on this. the reason why we go in those congresses I mentioned is also related to showing the system to clinicians getting their feedback so everyone knows what's coming in in this will be commercial in EU next year and it will be commercial in 26. but we already started some marketing work demonstrating the system. We actually demonstrated the system to more than 150 leading positions in the world and received really excellent feedback. Everyone just loves it. It's super easy to use.
Edvardas Satkauskas: It's very intuitive and it is from physician standpoint it's no-brainer.
Phone Room 2 (lt-vno-ant17): Yeah. Then I'll go ahead.
Edvardas Satkauskas: They all love it and they all want to have the system but we do also understand that they are not the payers for the system payers hospital. So it's a rather different story.
Hohler Zahn (de-ber-tsky2): One of the things that you just pointed out that I haven't previously thought about that that I really like about it is recording the force feedback and maybe some of the imagery and then use it for training purposes. I think that's fantastic because you're sitting in front of the actual device and…
Edvardas Satkauskas: Willis, do you want to jump in here Or should I continue
Hohler Zahn (de-ber-tsky2): you're replaying real procedures and I think there's probably no better training on the world. and have you figured out how to record this, how to analyze this? And I remember there's also a plan that was involving AI at a later stage for automated procedures. Can you talk a little bit about that? How you envision that?
Vilius Dambrauskas: 
Vilius Dambrauskas: you are doing well but I can shortly talk about this. So now in the current system we have only local connection because of the internet security things and like that. So we store all the data let's say in in databases and we have a capability just by the physical connection to take it how to say out of the machine. Of course in the future definitely this should be changed to some external systems maybe our local servers maybe some clouds or…
Edvardas Satkauskas: 
Hohler Zahn (de-ber-tsky2): Hey.
Vilius Dambrauskas: so it can be many different approaches in
Edvardas Satkauskas: And also from the AI perspective,…
Edvardas Satkauskas: we definitely see a lot of possibilities to use it and help physician during the procedure to maybe with some suggestions that in this situation you might consider that or another thing or maybe some specific device to be used or something like this and for that we would need then to train the system.
Edvardas Satkauskas: 
Edvardas Satkauskas: So on sufficient data from real cases but also enable the hardware and also software to analyze what's happening real time and provide some help.
Christina Halemba: 
Christina Halemba: So I just had one question for example you said suggesting potential next steps for a surgeon.
Edvardas Satkauskas: Yeah. Go ahead.
00:35:00
Christina Halemba: Would this in your opinion maybe come through analyzing the visuals for example and…
Edvardas Satkauskas: 
Christina Halemba: then understanding okay maybe this could be something to do next.
Edvardas Satkauskas: So you would have all the data included into any suggestions.
Edvardas Satkauskas: So let's say what are typical difficult situations. So either they have to navigate through very torturous and difficult anatomies or they have to cross a lesion that is not easy to cross and they need to change different devices use different guide wires.
Edvardas Satkauskas: So from that perspective depending on what instruments I used, what is the image a map of the vessel that you need to navigate the system could I just making things up but basically the system could say 90% of physicians in this situation would do this would you consider that or something like this so basically you would take the knowhow of best physicians and somehow suggest that advice to the physician who is taking or doing that particular procedure.
Edvardas Satkauskas: 
Edvardas Satkauskas: So this could be done. but also at the next step you also could say robot go there navigate there and if it had sufficient knowledge inside of how to manipulate how to navigate because It knows what I say levels of forces to apply. It has the digital map it knows how to navigate. So simple task can be done by the robot on its own just with a remote supervision of the physician and…
Edvardas Satkauskas: you would need physician for critical tasks for judgment of where that tent has to be placed or how do we close that artery or etc.
Hohler Zahn (de-ber-tsky2): We're simple simply just visual assistance through computer vision in certain parts of arteries.
Hohler Zahn (de-ber-tsky2): There might be blood clots here just by using computer vision. And another question, do you think because I'm thinking, okay, this is an expensive device and it's a critical device and it's got to operate correctly. How do you think about servicing these and recording meta telemetry about the robot system itself?
Edvardas Satkauskas: 
Edvardas Satkauskas: Yeah, it is a good question.
Hohler Zahn (de-ber-tsky2): This is beautiful.
Edvardas Satkauskas: In medtech definitely we have to comply with all the regulatory requirements. and those are more stricter than consumer electronics for example or so so the required stability reliability and etc requirements are stricter but we do recognize we will need to service this and as standards for meta industries also part of the contract with the hospital comes with the service contract.
Edvardas Satkauskas: So basically our engineers would need to go there time to time for maintenance and basically checking all that everything works as first step when we don't have connected devices this is not a connected device as the first device that will be certified is not a connected device. that's done intentionally, but then in the future it will become a connected device and it will be able to kind of report the data on its own safety to our engineers remotely. So we know what's happening, is it operating well or not? Maybe some extra maintenance is needed or something like this.
Edvardas Satkauskas: And we had some systems before developed that were not in this domain and they were more on diagnostic side but we had some solutions for engineers to connect remotely when the device is not operational and basically check the health of the system what's happening and maybe download some data or some logs that are necessary for
00:40:00
Edvardas Satkauskas: 
Edvardas Satkauskas: for us.
Hohler Zahn (de-ber-tsky2): Can you I imagine that the connectiveness of the device changes…
Hohler Zahn (de-ber-tsky2): how you obtain approvals from the FDA or here in Europe. can you detail a little bit about that? How specifically I think the most critical part is still the tiller operation. but obviously device also sensitive medical information about the patient as well as recording telemetry about the device itself.
Edvardas Satkauskas: Thank you. So it does affect and…
Hohler Zahn (de-ber-tsky2): How does do these things affect getting approvals in both the US and the EU?
Edvardas Satkauskas: but it's not something extremely complex.
Edvardas Satkauskas: We deliberately did not want to include this part into first generation of our device because we have plenty of questions from FDA to work even without the connectivity and…
Phone Room 2 (lt-vno-ant17): You want heat.
Edvardas Satkauskas: we left this for the future developments. But there's plenty of medical devices and systems in medicine that are interconnected that send that store data that communicate or allows even hospitals allow to share diagnostic patient data and all this type of things. so you have data requirements, you have patient data safety requirements, you have cyber security requirements and you need to comply to those. It's quite a lot of work. We are a small team. So, we chose to deal with this in the next stages of development.
Phone Room 2 (lt-vno-ant17): Daniel, do you have more questions?
Hohler Zahn (de-ber-tsky2): 
Tomer Frieder: Is it?
Hohler Zahn (de-ber-tsky2): I understand that and that was also kind of my assumption and honestly I think you're doing the right thing like focusing on the critical components of the system itself first and then go through all the struggles of increasing the usefulness of the system later makes total sense. and yeah I also think that you got the experience you said yourself 20 years of met you have looked at these approvals before and…
Edvardas Satkauskas: 
Hohler Zahn (de-ber-tsky2): it can be done and I agree with that.
Edvardas Satkauskas: So for I don't know…
Edvardas Satkauskas: how much you know about surgical robotics but there's a company ive surgical that leader in surgical robotics they are like what 150 billion company now basically one or two product company that manufactures and sell the Vinci robots and they have 70% of soft tissue robotics market in general. so their devices started for very different application but also a big robotic system.
Edvardas Satkauskas: it also operates from the next room but then gradually ne step by step they now even have sort of a social network for physicians who can share their cases what they do well where they learn from each other and basically this is sort of interconnected data sharing system that allows to progress and do some different types of research.
Edvardas Satkauskas: 
Edvardas Satkauskas: and share data,…
Hohler Zahn (de-ber-tsky2): 
Edvardas Satkauskas: compare data, brag about great cases and stay involved in this entire ecosystem. So, this is something that will definitely be part of Sante in the future as well. we see huge value of it. but it requires resources and it's step by step
Hohler Zahn (de-ber-tsky2): It's clearly designed for physicians to be kind of attached to these specific robotic systems through the ecosystem.
Edvardas Satkauskas: 
Hohler Zahn (de-ber-tsky2): And it's more like a customer binding feature, I think, rather than really a medically useful thing.
Edvardas Satkauskas: Yeah, but skills of physician define on…
Tomer Frieder: 
Tomer Frieder: Hello, thank thanks a lot for walking us through and…
Edvardas Satkauskas: how well the procedure will be done. So increasing skill both in day-to-day training but also sharing what works but not what would you do in different situations is also part of training.
00:45:00
Hohler Zahn (de-ber-tsky2): That could Okay. What?
Edvardas Satkauskas: So they have also professional interest to become better and better. and also the company also has a interest so that physicians become better and better using their system. So everyone benefits then including
Tomer Frieder: as Russell said I manage the same program in Israel. So first of all, it's always inspiring to see what people are building especially in such an amazing field that has a huge impact. from everything we picked up, I think we would love to be in touch with you and think we can definitely help you as you move forward and to be in touch on certain areas. I know I've been working in the startup system before and I know all of the challenges that you have I just wanted for we will send you over also some materials for the followup but just for you to be aware of our healthcare API where I understand right now the focus is definitely on the edge
Tomer Frieder: robotics and how to prove everything is working but at scale or even if you want to take it for a spin to see the results whether if it's with image or text or FHI or decom files or whatever export you guys have and you want to get a quick feeling while you're building your POV towards the next
Tomer Frieder: scale of AI. I think that can be a great fit even if you don't need to we are aware of the considerations when you take things in scale and push it to the cloud around so Google have done a lot of progress in the past couple of years and especially latest months also from regulation perspective so I think it will be very easy for you to get the sense of feeling of how you want to design your next steps we'll be happy to work with you on especially on the security side.
Tomer Frieder: so if you reach out to the next challenge how you secure your endpoint devices and also you know how we provide this white platform just as a reminder Google acquired mandant that is providing this end to end security challenges and beyond that we'd love to be in touch with you and Russa is building the startup ecosystem in the politics. We are hosting plenty on of events. We'd love to see you and engage with other partners, but it's just my take. I think these are the areas we can help you with the focus. Daniel probably I know we need to wrap up shortly but Daniel Russa maybe you had anything else on your mind?
Phone Room 2 (lt-vno-ant17): 
Hohler Zahn (de-ber-tsky2): Okay.
Phone Room 2 (lt-vno-ant17): Yeah, I have one comment like Tamar you sum up pretty well from our end…
Tomer Frieder: Hey.
Phone Room 2 (lt-vno-ant17): but I heard some concerns maybe from you and you talked about if it's on premises or on clouds whenever you will start thinking about where to move where to host what to choose we would love to be part
Phone Room 2 (lt-vno-ant17): 
Phone Room 2 (lt-vno-ant17): this discussion and to help to understand what are the pros and cons when you're thinking about the cloud and in the future I know that your company is already in the market for how long six seven years right officially a company established so we also have some additional incentives…
Edvardas Satkauskas: Yeah, we are in development for six years,…
Edvardas Satkauskas: not in the market. Yeah.
Phone Room 2 (lt-vno-ant17): which are available for startups who are up to 10 years old so you still have some time usually we come with this incentives once you already scaling. So you need a lot of resources and it helps to optimize your costs. So we can it's not probably right moment to talk about that…
Hohler Zahn (de-ber-tsky2): Yeah. Beautiful.
Phone Room 2 (lt-vno-ant17): but we're really looking forward and Daniel is working with some met companies as well here in Europe.
Phone Room 2 (lt-vno-ant17): 
Phone Room 2 (lt-vno-ant17): So there are some best practices which we can share bring or…
Phone Room 2 (lt-vno-ant17): help you to connect even with our customers to expand and to learn from those things. So we would love to keep in touch and to understand where are you in the coming months years
Edvardas Satkauskas: So what would also help us…
Edvardas Satkauskas: if you could I know you have a really wide area of things that you do and…
Hohler Zahn (de-ber-tsky2): Yep. There.
00:50:00
Edvardas Satkauskas: even if you take met or just something closer to us it's still a very wide range of things that you can do if from what you heard from us it would seem to you that this is similar to the use case of that this could be potentially used there.
Edvardas Satkauskas: So feel free to suggest because usually in many cases that kind of opens up discussion for how different things can be used and implemented.
Edvardas Satkauskas: 
Edvardas Satkauskas: you definitely don't know much about the wide range of capabilities that you work with and we started discussion with companies like Nvidia they have some specific things developed that would fit our next generation device very well especially talking about AI enablement connectivity from hardware perspective etc and…
Hohler Zahn (de-ber-tsky2): Mhm. Thank you.
Edvardas Satkauskas: it does make sense for us to know about those things early and so we can plan ahead and then potentially integrate them into our next generation devices.
Edvardas Satkauskas: 
Edvardas Satkauskas: From that perspective…
Hohler Zahn (de-ber-tsky2): I'm actually always in good contact with Nvidia's head of startup also Daniel here in Europe and…
Edvardas Satkauskas: if you see something that you say okay this might work in your case please feel free to suggest
Hohler Zahn (de-ber-tsky2): they also have a startup program. yeah, but I think there's good interconnectivity because we don't really cannibalize us, right? So I think there are both good use cases for you to run local inference with Nvidia hardware as well as run Nvidia on our cloud. it's true. When I look at what you're planning to do specifically in the next steps, when we look at telemetry, when we look at recording data, force feedback, when we look at the training applications and replaying that back and forth, when we look at also training AI models that can either suggest or highlight things that are happening or even automatically execute certain procedures.
Hohler Zahn (de-ber-tsky2): all of these are cloud use cases. One could build it not on cloud but today one would. yes it's true we have many European medtech startups that do similar things that have also acquired FDA approval including doing things like computer vision inference on our cloud in our US data centers.
Hohler Zahn (de-ber-tsky2): to provide their products. so we can definitely work through that. Also on our public documentation if you're uncertain, we have documentation around how for example in the CFR framework, how to get certified after medical device classification, we provide how to obtain our shared HIPPA compliance for security features that you will need. in the US and there's many more how to do an ISO 147 14971 risk management certification for FDA approval and yeah we can connect you with the startups.
Hohler Zahn (de-ber-tsky2): We can also talk in depth about how one would build this on Google cloud. Today mentioned we made significant advant advancements specifically when it comes to we've always always been good with security but with sovereign controls and specifically with customer encryption controls. yes and we highlighted the startup program at Vardas. you shared a vision that ultimately this will become a software company but it's kind of an aspirational goal.
Hohler Zahn (de-ber-tsky2): we obviously love to hear that and our startup programs are specifically engineered for these kinds of startups right so start out with what you're doing now and as soon as we hear something like okay AI is really important to us then our startup programs which are not only financial incentives to build basically for free on our infrastructure for a while …
Phone Room 2 (lt-vno-ant17): 
Hohler Zahn (de-ber-tsky2): but there also technical guidance there's also business development guidance and access to accelerator programs here in Europe where we basically reach out form cohorts of startups and kind of guide them on how to do more on cloud and for their business themselves.
00:55:00
Phone Room 2 (lt-vno-ant17): So Danielle,…
Phone Room 2 (lt-vno-ant17): we will be able to share some links right now even the followup, right?
Phone Room 2 (lt-vno-ant17): 
Phone Room 2 (lt-vno-ant17): And whenever there are some topics you talk or discuss first we have office in vill so you're always welcome to just jump up and to discuss things other thing we can always continue on chatting via and…
Phone Room 2 (lt-vno-ant17): talking via email and we will have next week one event in vill so maybe you will decide to join us and to meet a bit wider team we have in C region Yeah.
Edvardas Satkauskas: next week we are in Las Vegas so we'll not join…
Edvardas Satkauskas: but thanks for an invitation. Yeah, wonderful.
Phone Room 2 (lt-vno-ant17): So, to respect your time, we already So, thank you so much. If there's no questions right now from your end, so we will follow up. We will collect some sources. So, you can already start looking into what's there and let us know when we can, continue on some pieces and discussions around your infrastructure.
Phone Room 2 (lt-vno-ant17): 
Edvardas Satkauskas: Sounds great. So, thanks a lot. was really really pleasure to meet you all and we'll continue from here.
Phone Room 2 (lt-vno-ant17): Yeah, thank you.
Hohler Zahn (de-ber-tsky2): And Bill, thank you for sharing this openly. I think what you're doing is amazing. we've got all our emails,…
Edvardas Satkauskas: Thank you.
Hohler Zahn (de-ber-tsky2): our contacts in the invite.
Vilius Dambrauskas: Thank you.
Hohler Zahn (de-ber-tsky2): If you need anything, if you have a question, just reach out. We're here.
Edvardas Satkauskas: I'll do that. Thanks a lot. Thanks Daniel. Thanks Christina.
Vilius Dambrauskas: Thank you. Bye-bye.
Edvardas Satkauskas: Thank you. Bye.
Phone Room 2 (lt-vno-ant17): See you.
Meeting ended after 00:56:54 👋
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.


Major GCP specific Technical questions: description: Does Google Cloud have any tools or APIs that can help us process medical images from our robotic system? We work with medical images and potentially FHIR/DICOM data. Can GCP handle these types of files?
description: Since we're in healthcare, how does Google Cloud handle HIPAA compliance? or Is GCP HIPAA compliant?
description: We are developing a medical device. Are you familiar with ISO 14971, the risk management standard for medical devices? Is Google Cloud certified or compliant with ISO 14971?
description: What kind of support or resources does Google Cloud offer to early-stage companies? Are there any cost benefits or credits available for startups?

Meeting Transcript: Tech Exchange with Klang & Google Cloud - 2024/12/10 16:56 CET - Transcript
Attendees
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1), Evans Thomas, Jakob Pörschmann, Nikolai Danylchyk, Sophia Kuhl
Transcript
Sophia Kuhl: I think All we can kick it off already. Thanks first of all for taking the time. We know it's close to Christmas. some people are planning their Christmas break starting next week already. And we wanted to use the opportunity first of all to thank you again for signing this partnership contract with us, which is pretty cool to lay a foundation for our future engagements.  And we have one big milestone ahead which will be GDC.
Sophia Kuhl: We were talking with Jack Booza and Ishan on possible joint engagements, announcements by this time and we want to make sure that your text is somehow production ready not for the launch but that we have something running on GCP that you want to show the world and that we can possibly by end of January start producing some content around it a video can be a blog post. so this call should give us a bit more depth. We blocked an hour which is good and we're here to answer all your questions and maybe future next steps that we want to sort out because that's really a bit of an internal deadline for us by end of January to see what we have achieved by then.
Sophia Kuhl: There's also this question, what shall we do with the PSO engagement or what do you want to do with that? I was briefly touching on this with Evans already. So use this wisely. I mean it's a smaller budget now than what we had initially scoped and we really want to make sure that you use this for something that you can absolutely not solve inhouse and that really moves the needle for you probably rather towards launch…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah.
Sophia Kuhl: but we'll leave it up to you if you want to use it for the GDC engagement already then we're also up for it and…
Sophia Kuhl: with that being said yeah maybe we want to start like Evans if you want to give us a little intro what you have been with Jacob so far where you struggle
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): That sounds good. Yeah. I think that's also the last point that you mentioned about whether we use it for GDC or for the future.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): That's also what Odor and I were thinking what would be kind of the best ROI for us in terms of effort because the GDC one is also there's not that much time but just to give an introduction about what we've been doing so far is so after gamescom is when we had just a demo and everything was just very we did it just for the demo and also to prove to ourselves that this concept works particularly but since then  we've been trying to move more into a production setup and also move to Gemini Flash. So right now everything we've kind of merged it into our mainline branch and everything is working on Gemini Flash. We have a couple of systems ready to handle all the different cases that we are seeing all the error cases and stuff.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): But as Jacob knows is that one important thing is none of the vertex SDKs work in our environment. So we don't really have any SDK that works and so we're just like using our own handwritten SDK to communicate with Gemini APIs. It's not such a big problem but that is something just to set context. which also means that we've been trying to build our own response schema and that has been a bit of a struggle it's not really been like working that well for various reasons.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So that is kind of where we are at the moment kind of just to get the response schema working just so that I mean I know that even without it the whole thing works but having that working would be great in terms of being able to reduce latency and also reduce the amount of cost that we have. yeah so that's kind of currently what I am working on. if you have any questions or followup something to say otherwise I can also talk about…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): what we plan to work on starting from January
Jakob Pörschmann: Yeah, maybe some additional context …
Jakob Pörschmann: because we've been talking about it a lot. Essentially the challenge is Nicolola I can also share you the case. Maybe you have some additional ideas there. essentially the major challenge is that the schema that you're trying to generate is extremely flexible,  So it's a sequence of actions that need to be mutually dependent basically and every action has different types of parameters and that needs to be somehow fit into a schema. So we technically do have capabilities to sort of have enum types typed schema fields or also any of schema fields basically multiple options of a schema version.
00:05:00
Jakob Pörschmann: but yeah, from Evans's experiments and also on my side reproducing it. yeah, it's not at the quality level yet that we probably would want it to be. so yeah, my take so far is and that's what I just said in Slack that probably your sort of loop of checking the schema sending back to a model in case there are mistakes.
Jakob Pörschmann: it's probably run that for now you will still rely on to a certain point but I've seen in my experiments right now that actually pre-text generation works at much higher quality than the structured output at this complex schema so the free text generation has a much higher output quality in terms of getting the par parameters right etc getting the sequence right than the structured output with the schema.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I see.
Jakob Pörschmann: And again I'll dig a little bit deeper into that and see if we have some more guidance on this. but so far my take would probably go with the pretext. use the pedentic parser probably extended logic as I sent you right you can also set multiple types right for every single action could have a different pantic model check that and then still use that within your architecture of sending it back to the LM in case there's something off because in the end be the behind the scenes there's not much else happening but  probably that's an error factor just right now that the output schema is not really high quality.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay. Right.
Jakob Pörschmann: So that would be my proposal right now. Just go for free text generation, define the schema and the prompt. parse that using the for example piantic and…
Jakob Pörschmann: use that in your feedback loop basically right instead of just a control generation. that's at least from my point of view the way we could get this to work fastest.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): When you say free text does it just mean without constraint generation or…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): do you mean I see okay so okay that just or…
Jakob Pörschmann: Yes. Yeah.
Jakob Pörschmann: Yeah. Yeah. That's exactly what I mean. Yeah. Exactly.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): rather provide the schema in the prompt and validate when it comes back yes and…
Jakob Pörschmann: Exactly.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): send it back with correction.
Jakob Pörschmann: Exactly.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay yeah that's all we do right now.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay. Cool. Okay,…
Jakob Pörschmann: Exactly. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay,…
Jakob Pörschmann: Yeah. That's my proposal and I mean I can promise you to dig a little bit deeper there.  I've seen some internal issues that talk about exactly that, especially any off parameter. it's a fairly new feature. So, I'm sure that we're on that and will improve the quality of that as well. And that you can rely on it better, but right now it seems to me that's the quickest way to get where you want to be basically.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): That should also work on any model, So if you would want to go off Gemini for example, Because that's completely gntic free text is the model specific approach and I think constraint generation is more on the inferencing engine.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So, as long as we stay on vertex, I think it's going to stay the same. Because you're giving instructions to the prompt. So, that'll be maybe as u Should we talk about the next steps of what we want to Maybe I can talk about what we're planning to do in rough terms and then you could give your input. so for the Gamescom demo it was just like a small team working on it and just trying things out and figuring out basically product market fit of this feature but now we're trying to make it more productionized. I just want to talk about some of these things that we want to do. First of course we just want to move to Vertex. We're just using Google AI Studio and we want to move to Vertex. That's the first thing through Vert.ex. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): yeah and I don't know I guess most of it we would be able to do ourselves. just moving it to and serving it. I haven't looked much into it but in the workshop that you did yeah you were showing us how to do all of that. so that would be a first step. and then the other thing would be kind of just talking to someone about our whole stack around MLOps and whether what we are doing is kind of the ideal way to go about things. I'm sure you've seen many other customers do various different things. so that would be great and we kind of talk about future options that we do maybe not for GDC but also where we want to move.
00:10:00
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So for example a rag system is not something we might want right away but it might be something we do need once we keep increasing scale we might be able to get away without rag for the next month or so. so that would be one good thing. and the other one which I think is really important is setting up an evaluation system. because for us designers are now starting to get into the whole prompting stuff and it's also quite challenging for them. and one of the things that I also noticed was to get some kind of quality we have this feature where you talk to a seedling say you send a message to a seedling and then the seedling responds back.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): to get higher quality ut. someone like kind of refactor the prompt but then what happened was that resulted in a decrease in correctness. So these kind of things we can't keep going back and forth between correctness and quality. So we want to really build evaluation systems to make sure that look like these prom changes have resulted in a 3.5% decrease in correctness or…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): whatever and that's something we would really like to set up that is probably sooner rather than later would be nice. So an eval system would be nice.
Jakob Pörschmann: Yeah. Yeah.
Jakob Pörschmann: Makes sense. maybe
Nikolai Danylchyk: By a file system you mean sorry to interrupt by val system you mean validating so basically developing like a tool or…
Nikolai Danylchyk: using an out of the box tool something from Google to validate inputs and outputs based on a truth quote unquote baseline or what exactly do you mean by it?
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): From our server workers, we're directly pinging Google servers. We kind of want to route everything through a single gateway. So we're already building some infrastructure on that level, but we're open to hearing your ideas on what would be the best way to go. if Vertex for example has some features, we would love to use it or maybe if it's better we build it ourselves, that's also good. But essentially for us the truthiness doesn't matter so much…
Nikolai Danylchyk: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): because we're not working on real world truth but we do have hallucination and game truth. So that's kind of a different kind of truth I guess. Yeah.
Jakob Pörschmann: Maybe on the part do you have a tracing system or are you logging your inputs outputs etc already or how are you doing?
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): That's exactly what we're looking to build just hopefully in the coming weeks which is this gateway which will do logging/tracing of every request and its response and then being able to start collecting evaluation results…
Jakob Pörschmann: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): which we can run on that that we can then feed into a fine-tuning pipeline and then the gateway itself can choose now there's this release candidate a fine-tuned module.
Jakob Pörschmann: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I could start doing even AP testing every other result goes to every other module and we're going to look and run the evals again based on that so that we can make sure that we are advancing the fine-tuning modules and the prompts as well with competence.
Jakob Pörschmann: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So we would just be curious of…
Jakob Pörschmann: Makes sense.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): what comes out of the box from Vertex in terms of supporting this.
Jakob Pörschmann: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So that's because we're starting to build it and we want to build it so that it lands as well into the Vertex ecosystem as possible.
Jakob Pörschmann: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Happy look.
Jakob Pörschmann: 
Jakob Pörschmann: Nico, if you have some other updates there, right to interrupt me. have you checked some open source frameworks for this as well or some public?
00:15:00
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): have been looking at light lm which is one open- source tool but that is more meant for kind of just being this gateway and being able to give out access keys to different tools and…
Jakob Pörschmann: Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): being able to route between different modules which is definitely something that we would want in there.
Jakob Pörschmann: Yeah. Yeah. Yeah. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): The main outcome I have in mind with this whether we use flightm or build something of our own because it's essentially just a small piece of middleware that needs to exist there is getting this loop going where we can start collecting prompts correcting evaluations on those mp taking those prompts and training on them and getting that magic self-improving AI product loop going
Jakob Pörschmann: Yeah. Yeah. Yeah. 100% makes sense.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): that the more the product gets used, the more data we have, the better we can make the product.
Jakob Pörschmann: Absolutely.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): That's the blank fuse and Yeah.
Jakob Pörschmann: 100% C point 100% C. So the major two frameworks that I've been seeing are length for really the tracing and exactly this loop that you're talking about is len length smmith and length use.  Exactly. personally I'm personally a big fan of Lenfuse. I also know the founders quite well. they're Berlin startup. They're pretty much the most advanced in this field. I can also make a contact to the founders directly if you need some support there in setting that up. we also work with them quite a bit from the cloud side.
Jakob Pörschmann: So we don't have much from that but it's a strong recommendation just as a general open source framework right they're extremely strong for the tracing they're also working on evaluation and data sets etc etc so they're doing some extremely good work it's open source…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay. Yeah.
Jakob Pörschmann: but they also have a cloud functionality or cloud platform that you can use without managing it yourself by the way so that's a strong recommendation for this one works well with all the Gemini models as well.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): What did you get the name? Black Lus. I've seen Okay.
Jakob Pörschmann: So it's fairly easy to integrate.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Great.
Jakob Pörschmann: Yes that would be my main recommendation for this part. I can send you some resources afterwards on the evalation services from our side as well. As I said, we're working on quite similar tracing, etc. as well, but it's not as mature yet as for example length use. So, right now, you're probably going to be more happy with that. so we can continue on this.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): proposed looking into that as yeah. So, we're kind of in this build versus buy, …
Jakob Pörschmann: Yeah. Absolutely.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): question of,…
Jakob Pörschmann: Absolutely. Absolutely.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): is it complex enough that it requires us taking on an external tool or,…
Jakob Pörschmann: Yeah. 100% exa exactly take a look at that one.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): probably maybe the devil's in the details of that and it might be better to go with an out of the box solution. Yeah. Yeah.
Jakob Pörschmann: Let me know if you want me to make a contact or something to the team from their side. and I'll also send you some resources as a followup for the vertex evaluation frameworks etc. and what's the status there. so you have the full view on that.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I did have L fuse already on my radar.
Jakob Pörschmann: Nice.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): But I can read through the documentation to see if they support the kind of this fine-tuning AP testing loop. Okay.
Jakob Pörschmann: Yep. Yeah. Yeah. maybe as an additional thought,…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Hey Yeah.
Jakob Pörschmann: what if you end up desiring to go with self-built then we can obviously also support you there for something GCB native. in the end langu is also not doing anything else…
Jakob Pörschmann: but having a Kafka Q that sends to data warehouse they're using kick house I think obviously that's all open source from the GCP side you could set up something very similar with a popsup Q streaming into bigquery and then running your analytics based on that it can start always fairly lean but obviously then the devil is in the detail as you said right so if you end  deciding for that then let us know and we're obviously happy we'll be happy to help there as well.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah. Yeah. I will take a look into this.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): It's just is it easier to start just building something minimal or should we take on a big thing we get a sinking feeling knowing that I have to deploy Kafka into our infrastructure
Nikolai Danylchyk: You can always get it managed.
Jakob Pörschmann: Exactly.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): what go manage with Google GCP doesn't have a manage kafka …
Nikolai Danylchyk: Yeah, you can always we do
00:20:00
Jakob Pörschmann: We do. It's a very new
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): through the marketplace or…
Sophia Kuhl: It was fairly new. It was just announced a couple weeks ago.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Really? Okay. …
Sophia Kuhl: Yeah, I know has had it quite a while.
Jakob Pörschmann: Yep.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): so we are dumping all our request, response, errors, metadata what we're sending everything but only locally to the machine.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So it's kind of okay for designers also it's really nice but obviously this doesn't like we want to build up something like a larger data set and not just dump everything on the developers and also we want to take this and make it useful for designers because we see them as being the main drivers of at least changing the prompts and not engineers so much because we want to give them a lot of flexibility in how they want to make seedlings respond and stuff. So just kind of setting up this evaluation system in a way that works for designers like non-programmers.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So that I think would be a really good next step for us to do. Yeah. Yeah. We really want to still start building in both this improvement loop on fine-tuning and making the models better but also this observability loop for people who are working with the prompts and for them to start learning of hey if I feed this into the system this is what I get back and obviously they don't see it because it's users.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So being able to have that observability thing. Yeah. Yeah.
Jakob Pörschmann: Yep, makes sense.
Jakob Pörschmann: I do think language is probably the best option to go. I'm hearing that. Great.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): One more thing I had had in mind again I think as a separate step we can figure out what makes sense to do now versus later.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): but even maybe flash 1.5 8B like that we checked so I think flash works quite well for our use case really 8B doesn't and I guess fine-tuning could be one good way maybe we also generate it using Gemini Pro and then fine-tune 8B or something but that would be the next step for us to kind of achieve economic feasibility because I think once we hit that flash AP I think it gets a lot cheaper.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): It's half the cost of flash, So that would be a really good milestone/goal for us to get it working on 8. Okay.
Jakob Pörschmann: fair enough.
Jakob Pörschmann: Regarding 8B, I believe right now it's not on Vert.Ex. It's only in AI studio. And I believe I have to double check this, but I believe I read something that there's also no plan to have it on vertex right now at least.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): H.
Jakob Pörschmann: Let me double check this one, but this might be a blocker there or it might be a vertex limitation there. but these types of things are also always something that we can push towards the product team and that we say hey why is this actually not on the road map? We have a large customer where we just signed a commit that actually would like to use AB through Vert.ex.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay.  Yeah.
Jakob Pörschmann: So yeah,…
Jakob Pörschmann: let me also take that array and double check this and double check the road map here. and if it's indeed not then we can also take that as a product feedback.
Sophia Kuhl: Yeah, maybe…
Sophia Kuhl: if it's mainly around cost I mean our Google Cloud Next is also coming right after GDC. So I wonder what happens there. So there might be new announcements and more models to come. So I think optimizing right now for cost for something that then scales up in 9 months from now could basically be early because there might be some announcements coming from our side. So maybe Jacob if you can check that a little bit if there's something along the way that will help us to reduce cost…
Jakob Pörschmann: I mean promising is always difficult, you
Sophia Kuhl: because sometimes it just happens that we drop prices drastically and then can benefit from that.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Can you tell us anything about upcoming price drops? I mean also the reason I'm asking is because one thing Isabel really wants is she doesn't want to promise or put something that we won't be able to deliver economically feasibly. So that's why I'm also kind of interested in that.
Jakob Pörschmann: know that…
Jakob Pörschmann: but you see the general trends of LLMs right larger models are getting cheaper so you can probably expect it to go in a similar direction but I can't make any promises there right I don't know how exactly the business planning is going from our side in any case an 8B model will always be cheaper than a larger model right you always have that relative difference Maybe in absolute terms it are getting cheaper…
00:25:00
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay. Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah.
Jakob Pörschmann: but you always have the relative branch just because of the size. so that will remain
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah. From that perspective, I think Flash is kind of nice for us because it seems like okay, it's working well and we don't really need something like Pro or GPT40 or something, Flash works well enough for us and that's a positive thing. but then yeah, I don't know if we need to focus on optimization right now, but we just need to know that we can achieve this at scale and it's not something that will only work for hundreds of users. We need to know that this will in the future work for thousands of users.
Jakob Pörschmann: For anything that you want to really do at large scale,…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I don't know.
Jakob Pörschmann: I would always recommend go with the models that are available in Vert.ex also for privacy reason, but probably that's not even so much of a concern in your use case since it's generated world anyways. correct me if it's a wrong assumption. but you have definitely the stronger data governance data privacy etc.
Jakob Pörschmann: You always have that vert.xi. so for a large scale for a short SLAs etc I would always recommend to you go with the VIXi stack.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): All right. Yeah.
Jakob Pörschmann: Yeah that's pretty much the point. and now lost my train of thought so Vidxi essentially if you're searching for scale what I wanted to say is what I see most larger customers doing in this space is that they aim making their application work with the larger model first and then once they have exactly the proof that you mentioned okay it works at scale it works from the quality side of view they start fine tuning  meaning they start distilling their models and reducing the cost. But usually the approach is that I've seen working quite well, start with larger models, make it work, then go smaller.
Jakob Pörschmann: Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, that makes sense.
Sophia Kuhl: And I also want to chip in here that I mean the commit we signed right now is just a general purpose one and…
Sophia Kuhl: it's actually not setting you up for launch. so I think once we come closer to this, we really should look at what's the model of choice, what's the platform of choice, and then we can always go back and renegotiate with pricing and they will be more than happy to because right now you don't have a specific Vert.x AI discount or anything in the contract. It's just like the overall enterprise discount.  And I highly advise you to do this once we have more clarity on the level of course that would mean we have to increase to commit but what's going to be the spend you shouldn't pay more than you actually have to
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay, that's
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, that makes a lot of sense.
Nikolai Danylchyk: Yeah, then it will be a little bit boring.
Nikolai Danylchyk: We will have to sit and look into the numbers and do calculations and planning and then a lot of cris sheets and…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, we'll make it fun.
Nikolai Danylchyk: whatnot. But it's really worth it and yeah, I'm happy to do that in the least boring way possible.  Yeah, I'll come to your office with a crate of beer.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, I did a lot of Excel crunching a while ago just to see how it is. I think I also shared it with you Sophia.
Sophia Kuhl: But yeah, it should kind of relate to the commitment amount.
Nikolai Danylchyk: Maybe a little bit off topic from the LMS…
Sophia Kuhl: And yeah, once you're ready for this, we can always go back to the drawing board and find a price model that's suitable for your needs.
Nikolai Danylchyk: unless there is something relevant that you still have to discuss because we still have half an hour left but I just don't want this to get lost from the infrastructure point of view. how is it looking right now? Do you feel like you have a scalable system? Do you need help there from I don't know any point Not necessarily also technical some kind of a I don't know testing or just review or something because we just recently launched couple of games with some customers and we have a fairly experienced team in this particular area that can help you plan what to look for.
00:30:00
Nikolai Danylchyk: I mean, anything is what I'm saying. So, if you have anything on your mind,…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, in the coming months we will be starting to do so kind of more large scale kind of load testing.
Nikolai Danylchyk: drop, let me know by the way. If not, we can synchronize later on. Anyway, Sure.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): We're limited by size of the terraform plan of the stuff that we're deploying. so it's just like some minor things like that that we need to get through. and once we hit that there's definitely things that I would want to kind of involve you in Nikolai specifically optimizing kind of Kubernetes node allocations right sizing nodes moving over to u automatic node provisioning so that we're always getting the best deal on the nodes stuff like that that we need to be doing.
Nikolai Danylchyk: Perfect. Mhm.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So like I say most of our infrastructure runs inside GKE there's some popups and obviously a big query for the data warehouse but the rest lives as GE workloads. So it's mostly optimizing around that obviously GE and U GB the global opener and…
Nikolai Danylchyk: Your traffic is all HTTP, right? You don't have any UDP traffic at the moment between client and server. Mhm.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): so at the moment we have a TCP connection between the client and server.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So in April we're projected to move that all over to HTTP actually to gRPC…
Nikolai Danylchyk: Mhm. Mhm.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): but yeah at the bottom it's HTTP2. so the plan is to move have it all running over that. So we do have plans to route. So because we have really long lived gRPC connections, we've run into problems with any intermediaries because they always time everything out. so we are kind of just exposing our gRPC servers which is basically directly and doing SSL termination in there.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): we do have ideas and plans of routing that L4 connection through Cloudflare to get the bandwidth alliance discount basically on egress. so that doesn't make sense for us to do until we are paying a certain amount for egress because we need to be on the enterprise plan of Cloudflare which costs a certain amount of money every month and to do that it's just like we will hit a point that hit one point where we will route to get that egress discount.
Nikolai Danylchyk: destroyed.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So yeah, come April, we will see a lot of this stuff kind of finally come online there, but we will probably start doing large scale load testing before that. yeah, but it's probably going to be a lot of GKE work. So EAN will probably be a great asset  for launch. We're staying single region just that kind of so we will probably need to pick a region. we're in Belgium now. but we might go somewhere else with things. We don't need to go global region for latency purposes because our game is not really game latency sensitive.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): we don't need to be optimizing ping times essentially and just the complexity of going multi-reion with everything is not something that we want to take on right now. We're willing to take on the risk that you keep that region up for now. Which region are you seeing most people use? And how do you see most people kind of go out out of the gate with multi-region setups?
Nikolai Danylchyk: So the region that is usually chosen is the one closest to the biggest amount of gamers or players that you have. That's rule of thumb.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah.
Nikolai Danylchyk: The second rule of thumb is of course the dependency on the services because not all regions have the same services deployed. But I guess in your case you're mostly Kubernetes bound and…
00:35:00
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, except Yeah.
Nikolai Danylchyk: that's every region.
Nikolai Danylchyk: So third of course is the pricing. So, if you say it doesn't really matter if it's in the Netherlands or Belgium or Germany, choose the cheapest one because it's going to add maybe 20 milliseconds of back and forth time. That's fine. if you say it's fine, then it's definitely fine. So, you can save on that. yeah, that's pretty much usually the choice of I mean because there is also the whole data privacy stuff, but this does not apply to you because you're not really working with sensitive data. So, we're talking EU here and then you can move to other regions. It's not a big deal.
Nikolai Danylchyk: So I would choose the combination of three price ping generally speaking and service availability. Of…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. And obviously Yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): And it would be beneficial if we had that green leaf next to the region because we prefer to stay on a carbon neutral site as well. Yeah.
Nikolai Danylchyk: Of course.
Sophia Kuhl: but it has also higher costs. and Spurgeon has this active water cooling and stuff. But yeah,…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah.
Sophia Kuhl: it's published on our websites what's the carbon footprint of each region. so yeah, if that's a thing, we can also help you.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So let's start having the GK conversations with Ishan probably in January where we can start doing case tests there. if you're done with the topic for GD so what I think we need to figure out in terms of next steps for us specifically for GD GDC is first what makes sense to do within that time frame and also how much time commitment it needs from us if we're
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): planning to engage this professional services because my time is also split between doing things just for the game and…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): the LLM integration. So we just need to figure all of that out. Let's see right there.
Sophia Kuhl: Yeah, really my gut feeling and…
Sophia Kuhl: you can challenge me on that is having the clear road map and what you want to do, what you want to test, we could potentially do in this smaller cycle right now because I mean these two Nikolai and Jakob, they know quite a lot of your stack right now and if we have Ishan and then Jack with his connections joining so  that won't keep you a lot from doing the things you want to achieve. I imagine if we have to now get back to find the right resources, that can cost us a little bit of time until they see if they understand where you're at and so on.
Sophia Kuhl: So it's my understanding not the best use of your time then as well to kind of deal with new stakeholders in this kind of real and they I think can perform best if we have the road map and the plan already and then they can challenge and can do really gritty if you want to do prompt fine-tuning or this model evaluation that you wanted to do or really the fine print in pricing that helps us…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay. Yeah.
Sophia Kuhl: then to go back to pricing and renegotiate and this kind of stuff. But this is just my gut feeling and really really challenged me on this. But what I don't want to happen is that we kind of distract you from your work and in January you're like hey Sophia you promised us this this is going to bring a lot of value to us and then you have to spend two hours a week explaining stuff that you thought Google should know already.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, that makes a lot of sense that's kind of like what my concern was also. So it's good that you said that that was also what I was thinking given that we have very short time frame for example I'm off from next week and I'm back in the second week of January as I imagine most people also are so we have quite very little time.
Sophia Kuhl: I think that's something you can still decide if this thing and Jacob can maybe help us by the end of this week to figure out if it's somehow planned on Vert.x or not. But I think for us it won't be like a showstopper Jacob or we have to ask Ishan. But if it's done AI studio based only for the GDC part, I think that won't kill us basically.  But we also don't want to push you in a direction where you're using a model that is then somehow not production ready and that can't be deployed on vertex. So yeah, I think this is an effort you really have to consider wisely if you want to take that just for pricing purposes because I see some other opportunities to optimize on the price and that's probably nothing that will kill us for GDC and we can then keep on working on this topic afterwards.
00:40:00
Jakob Pörschmann: can speak on the GDC part, but I can just reiterate this one.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): There's peace.
Jakob Pörschmann: It's always our strong recommendation to go for Vort. for large production nodes …
Jakob Pörschmann: because of data governance etc. you don't have that in AI studio right in Vert.x you have those. so I don't know if suddenly AI studio is done, I'm not sure if they have some SLAs, but Vert.ex does have very strict SLAs for example. and even if they're much lower in a studio.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Cool. Yeah.
Jakob Pörschmann: So again, not sure if it's a showstopper there for the conference, but for production, it's always our recommendation to go with Vert.ex.
Sophia Kuhl: And story line.
Sophia Kuhl: I would also say it sounds a bit nicer, more like production ready if this is running on Vert.ex AI. yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I mean, yeah, we definitely want to be there as quickly as possible. Yeah. Just want to be able to, take that box and not have to think about it anymore. Yeah. Yeah. For sure.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay,…
Jakob Pörschmann: 100% if you…
Jakob Pörschmann: if you need any support there on integration or on the change to vertex then let us know but it shouldn't be a massive issue I mean you need some authentication which is not majorly complicated and you need to make some minor changes probably in the code essentially instead of an API key you have a service account right that's the major Definitely.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, even the 8P thing, I don't think it's a big factor for now. As long as we have a path to economic viability, I don't think we need to worry about that too much immediately. so does that mean I can still I ask you for support with things like this Jacob? Okay, so that's great. Okay, that is really cool and…
Jakob Pörschmann: Definitely. Definitely.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I appreciate all your help figuring out the response schema and all of that today. So that's good. Cool.
Jakob Pörschmann: I'll always try to respond as short notice as possible.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, I appreciate that.
Jakob Pörschmann: Also there from outside we can't offer SLAs in terms of response time but I'll give my best
Sophia Kuhl: Yeah, my colleagues maybe have to cover their ears a little bit,…
Sophia Kuhl: but put us out as much as you can. we come at no cost and so PSO is going to cost you right away.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah.
Sophia Kuhl: So I think we can still help you with our resources up to a point where you're like okay this is really time consuming and please somebody else take over here. but maybe this can be the working mode until early February or something and then if we see okay that's the last 10% that you can't solve on your own and that really needs expert in-depth support than the PSO team I think is more like the icing on the cake and now we're more doing the groundwork and this is probably the best
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah. Yeah. that works great.
Sophia Kuhl: It's I think okay let me clarify that a little bit for Ishan he will kind of have to go into the internal slots.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): I think should we also talk about the timelines or do you want to talk more end of January and I mean just for us talking to product and design how important is it that we hit end of January specifically or is that deadline bit more flexible? yeah.
Sophia Kuhl: I mean that also applies a little bit for the Google cloud next because I mean the session submission has happened already and he has some placeholders where he could potentially put you in there where we could see hey do we have a stage engagement that could happen for GDC. We said that's not the main part.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay.
Sophia Kuhl: It's more like this that Jack Booza features you that we have you in these closed door meetings and that we can create some marketing around it and then we have to see depending on the story line that we have until end of January. So I really see as a touch point with Jack and Ian yeah even last week of January.  So they have a good feeling and they can promote you internally maybe even they have some marketing budgets left and so on and we can go in marketing production. So this is really our let's say quality gauge before we invest that money and resources. So we're like okay now we got the story and now let's go full force into videos, blog posts, maybe a press announcement.
Sophia Kuhl: this would have more to come from your side but we are happy to provide more framework around it but this is something then the two of you probably have to worry about…
00:45:00
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Right. Yeah.
Sophia Kuhl: but I think this is the last stop so first you really want to get the technical foundation right and yeah I think for you it's just keep on doing what you're doing let know then we can have a smaller call after everybody's back from maybe Jacob and Nicola. You could have one call early January because I'm gone until mid January.
Nikolai Danylchyk: I'm also…
Sophia Kuhl: So you get same for me.
Nikolai Danylchyk: mid January of until 15th or so, but then you
Sophia Kuhl: But Jacob, I mean you have the Slack connection. I think if there's something in the second week of January, you can jump on it already and then we could maybe agree on something mid January just the five of us to see where we're at and then I can loop in Ishan in the final call end of January and…
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yes. Yeah.
Sophia Kuhl: then we're good to go. Does this make sense for you?
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Let's take it back to the team.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah. Yeah.
Sophia Kuhl: Shall we block something?
Sophia Kuhl: Maybe 17th January already. That's a Friday. Doesn't have to be maybe 30 minutes.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Let's just start putting something in and then we can just have it in by Yeah,…
Sophia Kuhl: So, I will most likely sync with your EA then Nadia or just do it on the spot. I mean, if everybody has their calendars right now, I don't have much going on on that day. So, okay.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): let's just not have set it all up because we might want to bring some other people in next. Yeah, sounds good. all right.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): It works for me.
Sophia Kuhl: So what was Nadia should set it up?
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Yeah, I think I'm not in control of my own calendar. So, this
Sophia Kuhl: 
Sophia Kuhl: Yeah, I'm still working Then I'm out until 16th. I will have a stand in Leant. You actually know So that will be easy for yeah, so if in the first two weeks of January something is coming up that's hard. Yeah. Maybe one more thing I want to draw your attention to is so yeah the deal is signed but as I told you it can take up to 10 days.  right now the cues are really jammed for booking I'm also escalating internally to get this faster but this onboarding email will come either this or next week and this contains your new billing account ID and how you switched your projects to that and so then to make use of the discounts and for PSO this will be a separate stream then we can release it down with Laura should you met her my colleague
Sophia Kuhl: league and we set up a new engagement proposal that is suitable for the 60K an so but that's a bit of paperwork and I also see if we do this in January this could be time you can spend better in Yes. But yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): All Yeah, I'll have everything prepared with the platform team of moving the billing account as soon as that's Yeah,…
Sophia Kuhl: Yeah. Although I think this email goes out to Mundi, but I should be on CC once I have that in the inbox forwarded to you.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): just forward it to me.
Sophia Kuhl: I don't expect Mundy to do the logical migration.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): So all right.
Sophia Kuhl: Anything else can do for you?
Sophia Kuhl: So I'll chase Nadia for this meeting. Then Jacob and Evans can sync on Slack. Nikolai hopefully is a daddy by next year. So yeah.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Congratulations.
Nikolai Danylchyk: Thank you.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): Okay.
Nikolai Danylchyk: We'll see. Still a bit time.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): No, no, I take it back.
Nikolai Danylchyk: By Christmas.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): All good for me.
Sophia Kuhl: So it's exciting. Yes. And yeah,…
Nikolai Danylchyk: Yeah. Have a nice evening.
Sophia Kuhl: if you have some things to do early January, I think we can also have a little bit always welcome to bring it to the party. Love to see it I think then we can close nine minutes early unless you have some more topics.
00:50:00
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): All right.
Sophia Kuhl: Thank you so much.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): All right. Ciao. Thank you so much for your time.
Nikolai Danylchyk: You. Bye-bye.
Sophia Kuhl: Appreciate your time. Byebye.
1st floor - UNIHAVEN (Small Meeting Room) (Klang House, 1): right. Bye-bye.
Meeting ended after 00:50:31 👋
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.


Major GCP specific Technical questions: description: What are the recommended ways for interacting with Gemini via API?
 description: What is the recommended approach for generating a flexible response schema with Gemini?
 description: How can we best use Vertex AI for our MLOps pipeline, including model serving and versioning?
description: What are the best practices for setting up an evaluation system for our LLM prompts and responses, and what tools does Vertex AI offer for this?
description: Does Vertex AI have built-in features for logging and tracing LLM requests and responses?
description: What open-source frameworks are recommended for tracing and evaluating LLM applications, and how do they integrate with Google Cloud?
description: Is there a managed Kafka service available on Google Cloud, and how does it compare to other data streaming options like Pub/Sub?
description: What are the options for fine-tuning the Gemini models, particularly the 8B model, and is it available on Vertex AI?
description: What are the best practices for optimizing GKE node allocations and using automatic node provisioning to reduce costs?
description: What are the recommended regions for deploying our application, considering factors like cost, latency, and service availability?
description: What are the data governance and privacy features available in Vertex AI, compared to AI Studio?

Meeting Transcript: Remerge Catchup – 2024/09/25 13:29 CEST – Transcript
Attendees
Jakob Pörschmann, Jakob Pörschmann's Presentation, Studio 3 (de-ber-tsky2), Vasily Ovchinnikov
Transcript
Studio 3 (de-ber-tsky2): Actually doing, is it?
Vasily Ovchinnikov: Hello guys, and hope it.
Studio 3 (de-ber-tsky2): I honestly,
Vasily Ovchinnikov: Doesn't it? The weather is not until nice anymore, right?
Studio 3 (de-ber-tsky2): It is not. We are connecting to you from one of those studios where we should or official YouTube videos. And I was there…
Vasily Ovchinnikov: it tries it right here.
Studio 3 (de-ber-tsky2): because I never been in this room, you can see it looks like in a production area with the whole setup and everything you would have. Yeah. How are you doing?
Vasily Ovchinnikov: Really interesting, Indian studio. It's a trace to be a production area, not quite and with my engineering, make mechanical engineering And sound engineer background It's very close to that.
Studio 3 (de-ber-tsky2): I think it's pretty much sound proof with all the set up this is a purpose studio. So if we would be able to turn the camera, I would because there's a drum set just behind you basically. And yeah, we have these studios in Berlin for Kratos to actually book them. Yeah.
Vasily Ovchinnikov: okay, that's the same. Pretty cool.
Studio 3 (de-ber-tsky2): Because we have a very school and practice. We have a major meeting room issue shortage in Berlin. So now they're being turned into meeting rooms.
Vasily Ovchinnikov: Better not.
Studio 3 (de-ber-tsky2): I didn't know about it.
Vasily Ovchinnikov: I mean,
Studio 3 (de-ber-tsky2): I saw people. They are not a lot after these rooms, which is good because otherwise it's just so packed to find a meeting room in this office. So it's a good thing. Vasily get to know Jacob is over 104, ai specialist here in Berlin. Maybe you guys can, quickly get to know each other. Yeah, that's nice meeting you I'm jakobos,…
Vasily Ovchinnikov: Liquid.
Studio 3 (de-ber-tsky2): 11 always said, Yeah, I'm custom engineer image engineer from our side working with our customers, basically, on Putting their ML projects into practice and they have project in the practice. And yeah, I've been in the group for three years, a bit more Becca. And yeah, that's one of two sentences. And maybe for today, just super interested in hearing what you're working on, and maybe how we can support.
Studio 3 (de-ber-tsky2): That's how we can unblock you and…
Vasily Ovchinnikov: Yep. yeah,…
Studio 3 (de-ber-tsky2): let's keep it to open.
Vasily Ovchinnikov: just so that I have, I don't know, but I was introduced. I'll just do a little bit contradiction myself, I am a director of machine learning and infrastructure Science. Team is because internally. What to do is we roughly what you're doing and then provide tooling a setup for the data scientists and anybody who really actually wants to work with modeling to do their stuff with minimal effort. we are going slow, motion of an extra mile to an extent that
Vasily Ovchinnikov: To use a vertex. One would have to know how to date five data, all Something integrity details for modeling. We also have libraries on top of that. That essentially make it so the data scientists can go build their architecture of the model declare features and…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: they're good to go. So I guess in this case in this way we are some what closely aligned in terms of what we do. And we do use vertex and…
Studio 3 (de-ber-tsky2): Nice. Yeah.
Vasily Ovchinnikov: We are using it in a very particular capacity and was wondering if there is something that we are not using and for example, something the way in the way we use, it may not be optimal. I don't quite hitting it But hey, it's good to be open for ideas.
Studio 3 (de-ber-tsky2): Yeah. Yeah,…
Vasily Ovchinnikov: I definitely don't know all features.
Studio 3 (de-ber-tsky2): homesense hundred percent. I mean That's exactly where our customer engineering team comes in as a bridge, Trying to understand what are you doing and Matching you, basically, with the newest products that we are putting on the market, making sure, you have everything you need in terms of enablements, if you need help for brainstorming, in terms of architectures, if you need hands on support and I don't know, resolving certain blockers and so on it's on maybe limits to your creativity in this right.
Vasily Ovchinnikov: Interesting.
Studio 3 (de-ber-tsky2): And Yeah, I was actually.
Vasily Ovchinnikov: I mean, I can drop the blocker right away. Machine availability is a per region being transparent.
Studio 3 (de-ber-tsky2): Yeah. Yeah. Briefly mentioned about that to.
Vasily Ovchinnikov: It's not.
Studio 3 (de-ber-tsky2): Yeah, but maybe you can also look into the whole thing, if you can maybe explain this again to Jakob from your point of view, so we can illustrate the whole pain point and…
Vasily Ovchinnikov: Sure.
Studio 3 (de-ber-tsky2): that would be great.
Vasily Ovchinnikov: it's rather pretty easy If you want to use it. So again, full disclaimer, we are basically extremely exclusively using vertex custom jobs because of how our setup. Looks like models are intended to be language, agnostic, generally. So they're Dockerized. So they are not necessarily plugged into or married to a particular framework architecture Vertex included, right? It's just generated to make it very, very flexible algo. We use custom jobs and it works fine. We have a bit of a glue code that starts this custom jobs which hyper parameter tuning. Those works pretty well.
00:05:00
Vasily Ovchinnikov: What doesn't work though, is when a data scientist wants, to use a particular machine type, they go to vertex documentation and by the way, there are c2d machines available. They go Our clusters or other Our setup is for Europe. But three specifically, and has been there since the time memorial Essentially, we were there since AI platform and there is a good reason we were all earlier, adapters of the eye platform,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: my greatest of that vertex, all of that and there's good reason to keep it in you three because data and gdpr. We don't want to deal with that particular transition necessarily.
Vasily Ovchinnikov: But they go to the docs, they say c2d that would work for our models really well, they tried to we have a C2 general quota in Google quotas configuration, which theoretically should include.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: All C2, family, they scheduled c2d. They say, this machine is unavailable for the region.
Studio 3 (de-ber-tsky2): Mmm.
Vasily Ovchinnikov: Bummer They try another one. this machine isn't available for region bomber and this is happening. not constantly anymore because they just stopped trying…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: but often enough for them to stop trying which is a major problem,…
Studio 3 (de-ber-tsky2): but,
Vasily Ovchinnikov: So what are the plants and terms of making that a little bit more transparent per region,…
Studio 3 (de-ber-tsky2): Yeah, yeah,…
Vasily Ovchinnikov: what is actually available? Some.
Studio 3 (de-ber-tsky2): good question. maybe also the follow-up afterwards. Maybe you can give me a couple specific example. I mean, you mentioned it c2s and some other Sea Family machines recently, maybe you can give me some specific examples and then I can look into it. Specifically obviously, it can always happen that there is still quarter limitation of some sort. It can happen that there is an extra stock out in the data center of some sort, but that's not always fully transplant. But to be honest, that shouldn't happen to the point that you try multiple times and over a couple of days and the stock out is still happening, right? And that's
Vasily Ovchinnikov: No, the error is, this is not available in your region.
Studio 3 (de-ber-tsky2): Okay, okay. Yeah.
Vasily Ovchinnikov: That's the thing. It's that when something is with quotas, we already had a very intricate encounter when we were debugging. For one a bit over a year and issue with which we thought was quotas but wasn't actually with the Google Kubernetes engine specifically.
Studio 3 (de-ber-tsky2): Okay.
Vasily Ovchinnikov: So no it's not to go out*. It is we have quarter, they're available CPUs.
Studio 3 (de-ber-tsky2): Yeah. Got it.
Vasily Ovchinnikov: It's just That doesn't work and RDS is compiled a list of the machines that do work. And I can find exact machines. That didn't C2d. High Man,…
Studio 3 (de-ber-tsky2): Yeah. Yeah,…
Vasily Ovchinnikov: for example, is not available but was declared available. again,…
Studio 3 (de-ber-tsky2): let's do that…
Vasily Ovchinnikov: I can compile it right.
Studio 3 (de-ber-tsky2): because I can tell you on top of my mind in general, which exact machines should be available. Generally, Obviously, that the documentation should be up to date, if obviously that's an issue but I can double check that. So I think the best way to go about it would be if you just send me a list of machines that work and I'm not very happy. But somehow documented, right? Both would be helpful and then I can look into it a bit.
Vasily Ovchinnikov: That maybe tricky because that would require us to test all that. We don't necessarily have capacity right now.
Studio 3 (de-ber-tsky2): you don't have to test specific if you have them available, if know the specific types some that didn't work that's already enough, don't you? So
Vasily Ovchinnikov: Okay, cool. I'll find what we did test and what is a listed available but we couldn't use and…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: send it to Generally. The idea is that the documentation should reflect, what is reflecting?
Studio 3 (de-ber-tsky2): Yeah, 100%.
Vasily Ovchinnikov: The commission should be real. Okay, I see. God.
Studio 3 (de-ber-tsky2): And they're always a couple issues that might still not allow you to create it. If you send me, So, quote us are always project bound and region bound, right? You probably aware, right? So cross projects,…
Vasily Ovchinnikov: Yes.
Studio 3 (de-ber-tsky2): you'll have to assign separate courts. Okay,…
Vasily Ovchinnikov: Everything is within one project.
Studio 3 (de-ber-tsky2): And then that shouldn't be the major issue. Nevertheless, if you could also send me the Of whichever project you were trying it with then. I can also try to check in the background whether there's a project specific limitation that might apply that might not allow you to It's created resources.
00:10:00
Vasily Ovchinnikov: Will do most definitely that might be the case in fact, right? Because our project is an early day,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: air platform. He tested this pretty please kind of thing which did have some weirdness around quote, and possibly scared over.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: What All right, that I'll do the next question. I have immediately is probably a hot one given that everybody in their mother and now doing generative ai which most of the times don't
Vasily Ovchinnikov: Accelerators. what is the layout that you guys plan across regions? Because for some more model of our GPUs may be beneficial, they're definitely not quite yet…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: because Tensorflow, really. But They may become one and it was notoriously difficult to get the quota out of you for a 100 As long as the old ones were available in Europe. It was p100, a 100s were unattainable. Now they're attainable but generally it feels like there is some sort of strategy going on about how they distributed. I would like to hear about that.
Studio 3 (de-ber-tsky2): 100%. Yeah, I've been through credit journey over the last year with the A100 Quarter requests. You mean that So generally I also can tell you on top of my mind which exact regions, we have them deployed again. Documentation, should be up to date there, generally. If you tell me early enough and earlier enough might mean, as early as that you'll need a 100 then
Studio 3 (de-ber-tsky2): Yeah, tell me that and I'll handle their quarter issues for you That also works quite well. So I think by another capacity is okay Who sometimes we can't assure you. if you have very strict data governance for the specific reason, then it might be a bit challenging sometimes if
Vasily Ovchinnikov: That's the thing, theoretically some issues can be solvable, So we are not super flexible but not completely a region and inflexible either, we're not medical organization per set. This is why I'm asking about some strategies about where those GPUs generally. You plan to Set, if you say, I don't know, 10% go to Europe, everything else goes to yet, good to know Then we will know that if we want to have to use GPU Google have to somehow make it do with the US location and…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: very sorry for the background cat noises.
Studio 3 (de-ber-tsky2): Please more of that. No, and that's not this one rule. I think it's still everybody still very highly under demand, which regions are specifically Still always depends a little bit on The new supply that they get so that's not this one. Who basically of Asia always works or Europe always works or this one region always works. If you have a specific case just let ideally,…
Vasily Ovchinnikov: Okay.
Studio 3 (de-ber-tsky2): if this is not too oppressing. Obviously, Ideally, let me know and then we plan it together. I have internal dashboards, I can wear conceively availability across regions.
Studio 3 (de-ber-tsky2): Then I can basically consult you a bit. Maybe try that region. The second thing is we can do is just get your quotas up in a couple regions that work for you theoretically so you have options. Basically there'll be segment and…
Vasily Ovchinnikov: Got it.
Studio 3 (de-ber-tsky2): the quota I would rather recommend you. Let's do it preventatively if that's fine with you and so we don't have to deal with it under pressure once you actually need it and yeah.
Vasily Ovchinnikov: As of nowhere sitting on the quota of two a 100s. I think maybe four. That is for experiment And by experimented me again, we identified that to nobody's surprise. Tensorflow is given our architecture and the volume of data is the bottleneck actually and not necessarily the computational core.
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: But that may change. I'm just not quite sure when Noted once,…
Studio 3 (de-ber-tsky2): Okay. Yeah.
Vasily Ovchinnikov: once our data scientists get to get to the point where we get on our side with optimizing tensorflow data pipeline and they get to the point. When they want to try GPUs and foreseeable future, I'll reach out and say, maybe we would need a few more.
00:15:00
Studio 3 (de-ber-tsky2): yeah, since 100% then maybe the second point there, I would definitely recommend thinking about whether you do need an a100 because obviously they're nice. If you need the large memory, 80 gigs, what do we have 40 and 80 gigs? I think if you can work with smaller, ones, theoretically, I would recommend going for L Force or T Force because they're much easier,…
Vasily Ovchinnikov: .
Studio 3 (de-ber-tsky2): available and much cheaper as well. So, it's
Vasily Ovchinnikov: Are they married to some weird CPUs though there was this table? where, Give me a sec. I have this table somewhere here underneath in the list where there was a particular which accelerators go to which machines and…
Studio 3 (de-ber-tsky2): Exactly.
Vasily Ovchinnikov: that Or before something. Not quite. Clear immediately was there. Let's take a Google account. No, that's not. Specifying GPS. Here's the table, right? I have it. I mean.
Vasily Ovchinnikov: So you say testing force, of course And that would work with machines. yes. Okay. Here's the problem with that. Those are marriage to end family of CPUs, right? And if the model part of the model is using, this is a type of CPUs that works for sure. But is at least quite slower than or A1 CPUs.
Studio 3 (de-ber-tsky2): Right.
Vasily Ovchinnikov: So if the model specifically, not exclusively uses GPU. But these are some sort of a combination. part of the model is GPU Bond and…
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: the pirate CPU board. frankly, it's monetarily not a good plan to use this accelerator,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: unless it's 80% GPU But noted Okay it keeps wars and…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: of course we don't have any quotas right there for those. I will actually change that maybe suggested to data scientists to try and…
Studio 3 (de-ber-tsky2): It's always the case to case decision,…
Vasily Ovchinnikov: see how it goes.
Studio 3 (de-ber-tsky2): what the exactly want to do and how large the model is, I guess just to have it as a back backup option, That they are usually quite popular alternatives…
Vasily Ovchinnikov: Mm-hmm
Studio 3 (de-ber-tsky2): if you're not. Training a large foundational model, they usually good. If you do need the A100 power,…
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): for I won't stop you. But
Vasily Ovchinnikov: Generally, frankly we really don't deal the Model structures that we do themselves are not particular.
Studio 3 (de-ber-tsky2): yeah.
Vasily Ovchinnikov: They're No means, but they're not like Portugabytes inside in size and model can be, I'm here. I'm just getting rid of the background and…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: cat noises, so yeah.
Studio 3 (de-ber-tsky2): Okay.
Vasily Ovchinnikov: and yeah, so we could probably just work with a more human-sized part then, an a100 is, Allah, I will have to ask the data scientists…
Studio 3 (de-ber-tsky2): What?
Vasily Ovchinnikov: because every experiment they did where also N series. CPU, wasn't involved? especially with the thing is our models are not architectural giant foundational models, but they are normally with a couple of 4 to 10 layers deep each individually, but They are multi component models. So we do not have layers built into the model themself Rather we have a 4 to 10 layers model that is then a precursing model for another model and then it's processing model for another model.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: So this kind of composition so there is a lot of parallel training and thus speed of training of those individual components critical.
Vasily Ovchinnikov: And they are holding tides to c2cpus because I believe that they have a larger catch than what anyone machine provides. So they chew through the data, much quicker.
Studio 3 (de-ber-tsky2): But it might be maybe. Yeah, yeah. No sounds good.
Vasily Ovchinnikov: Let's see. noted.
Studio 3 (de-ber-tsky2): Sounds good. Yeah. Overall just let me know regarding your knees there and earlier you let me know that you need more quota on The better. We'll be able to solve it. Yeah.
Vasily Ovchinnikov: Will do that. That's really good to know. Thank you very much. I also learn the data scientist that.
Studio 3 (de-ber-tsky2): Definitely.
Vasily Ovchinnikov: If we have to pay 100, we do have them. Reserved, if you really want to try something that's probably the best play,…
00:20:00
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: the best thing to try, because you're not limited by anything. It's powerful monster. But if you want to use regularly, then there will be some delay in quotas and get in…
Studio 3 (de-ber-tsky2): Yeah. Yeah,…
Vasily Ovchinnikov: And so this out, cool, I have more questions.
Studio 3 (de-ber-tsky2): please let me tell me.
Vasily Ovchinnikov: As I said, we have predominantly using custom jobs and sometimes hyper parameter tuning. We are not using anything data sets because our data is entirely in bigquery and we have our own pipeline and I'm kind of wondering looking at the doc. I don't think we are missing much, but I may be wrong and I would like to ask you, whether we are missing something One question, two comes in the chain which is other during that vertex style first like tensor boards, it's comparison. But let's start with the data first. Is there any reason for us,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: practical reason to go with data set? If most of our data comes from bigquery? And important note and we have our own artifacts persistence mechanism. So versioning and persistence.
Studio 3 (de-ber-tsky2): For data as well data versioning.
Vasily Ovchinnikov: For any artifact model produces.
Studio 3 (de-ber-tsky2): What type of data is training on is regular structured data. For regression and classification cases.
Vasily Ovchinnikov: All sorts of stuff actually but generally yes it's a time series. They would tell in general, it's a time series data right with structure.
Studio 3 (de-ber-tsky2): Okay.
Vasily Ovchinnikov: So it's not like a random text date on. There are not a random image data. Nothing particular offensive, it's chemical, it's fitting bigquery pretty well with the catch. Is there just comparatively a lot of that A lot of that as in not gigabyte per minute…
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: but Easily terabytes per couple of days and models. Don't use this much. the biggest data pool that a model used for training that we have is a single terabyte really but by far generally it's like an Ballpark of couple of hundred megabytes to a few gigabytes per one tree,…
Studio 3 (de-ber-tsky2): Okay.
Vasily Ovchinnikov: which is a rolling window as well, right?
Studio 3 (de-ber-tsky2): Okay, so it's time to use models. yeah, overall data, so the set functionality, in Vertex is nice for exactly what you mentioned, versioning and really managing your data, it's accessible building statistics getting
Studio 3 (de-ber-tsky2): Distributions and so And off your data sets, If you have a versioning mechanism that works for you and you're happy with it. I don't think you'll need projects data sets on top generally,…
Vasily Ovchinnikov: You go.
Studio 3 (de-ber-tsky2): Obviously we can take a look deeper and we can discuss your use case deeper and see whether it's still make sense. But generally what datasets does is exactly that it helps you version your data and then helps you tie it directly to your modeling artwork. So helps a data tie that to a model artifact. If you have an external mechanism for that, you're fine, data sets per se is not a resource, it's just a Only, just links to your data set in bigquery or…
Vasily Ovchinnikov: He?
Studio 3 (de-ber-tsky2): in cloud storage where we have it. So it doesn't deploy any additional resources. So that doesn't take any additional storage. it's actually not buildable and it's not a
Studio 3 (de-ber-tsky2): Service, if I want to call it that, but it's literally only linking,…
Vasily Ovchinnikov: Got it.
Studio 3 (de-ber-tsky2): your data set to a model artifact, and that's the native version. So, as I mentioned, if you have a mechanism for that,…
Vasily Ovchinnikov: Yeah. Got it.
Studio 3 (de-ber-tsky2): you'll find pretty.
Vasily Ovchinnikov: I was wondering whether maybe there is some I don't know throughput benefit or something because
Studio 3 (de-ber-tsky2): I mean if we really look into the detail, I could double check but I don't think so. To be honest because it's just a link, If you have the link in your third party or…
Vasily Ovchinnikov: yeah.
Studio 3 (de-ber-tsky2): whatever tool you're on tool, or whether you have it in vertex, doesn't make it.
Vasily Ovchinnikov: It goes to it, the materialize, the artifact, and they go directly to Google Cloud storage. So then they should be using the same underline BPC side with dimension.
Studio 3 (de-ber-tsky2): Yeah.
Studio 3 (de-ber-tsky2): So I don't think that it will be a massive difference. the only difference is really the integratedness, I guess so which ML ups or what's the MLS set up?
Vasily Ovchinnikov: It's an in-house thing actually. we were facing this whole my God our training our soldiers organized as much everybody else's and we want to have a control over that. Five years ago, and…
00:25:00
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: nothing comprehensive existed. Plus, we have some requirements for serving. We cannot use for example,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: vertex, serving or any external serving, because of latencies Right? We are a hundred milliseconds bound, and on a response, and that response must include. I know, 10, 20 predictions. So it cannot be remotely. Hosted model models are hosted on the actual machines that respond.
Studio 3 (de-ber-tsky2): I'm gonna get it, okay, that's w,…
Vasily Ovchinnikov: So yeah, there is that and
Studio 3 (de-ber-tsky2): that we know the nice topic to look into actually, but sorry, I finished your finishing up.
Vasily Ovchinnikov: Yeah, and nothing existed. We had to develop it from scratch. Basically, we have our in-house system that locks the model code to particular version. It also looks materializes as soon as possible, any incoming data and without going data bond to this version and the window Time window that it has been trained on. So, all that is essentially a system agnostic, it can be hosted locally, it can be hosted somewhere, it is now hosted in Google Close storage, basically putting their case there and as one of the backbones we use the DC Library older version of it before it became what it is. Now, but we also kind of don't have to The idea is that there are some storage, we have some versioning and that we just use it, tools to move things around.
Studio 3 (de-ber-tsky2): Yeah, makes sense.
Vasily Ovchinnikov: And so AI platform didn't have any mechanisms that when we started there was no AI platform. But when is the period,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: it also didn't have any particular mechanism or preference on how the version you could happen. So we just didn't continue to developing our own And it works.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: And since it's like the differences, if we were to switch over to save vertex thing we would have to then Somehow invent something to link it, the training which were to take care of to serving the productions or…
Studio 3 (de-ber-tsky2): Exactly.
Vasily Ovchinnikov: regular service. Which is like, Why if you have already a functioning system?
Studio 3 (de-ber-tsky2): exactly that. And then they'll be exactly my point, right? If everything works at the moment, you don't have any major pain points. then why change it the major point of data sets, for example, would come really in the Integratedness, right? That's what I meant. So for example juice,
Studio 3 (de-ber-tsky2): Kubeflow as an erupts framework and you decide, You want to have managed key flow on vertex pipelines. Then it's a very nice experience because you don't have to write those connectors to data sets yourself, but they come out of the box side. It's basically just import so that and the managed by Google. So you don't have to worry about basically things break, So that's really when the integrated this comes in same for the model registries same for Bigquery and So basically gives you the end to end Integratedness That's probably the major advantage of data sets and the entire it's manage I'm set up that we basically
Studio 3 (de-ber-tsky2): Open source but Google managed open source connectors basically for all these modules, right? Yeah. But essentially the artifacts in the pushed on left to right? So if that works for you,…
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): there's not a massive pain to migrate that
Vasily Ovchinnikov: Since we mentioned because several times, we have a problem with it. there is a kind of well-known problem, which is it's being sucks as an impossible to itemize in terms of what meaning.
Studio 3 (de-ber-tsky2): Billing. Really. Yeah.
Vasily Ovchinnikov: And victimize is something that we've solved internally. Very frankly hacking, the job ideas, and making a custom and such I have custom reporting, but there is still Issues with You cannot assign budgets, for example, to particular, users the user groups. It's very, very flexible disregard. So, when we wanted to open it up, not just for data scientists that build production models, which pay for themselves to some extent,…
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: And wanted to open it to business analyst. Which are not as technically technical one. And I'm not a skill in building queries too. That was a major scale point because you couldn't say Okay, here's your budget, it burn everybody's budget essence.
Studio 3 (de-ber-tsky2): Got it. I'm not too deep myself having bigquery billing topics but from what I know is that you could go via reservations essentially so reservations you're right now on demands probably right?
Vasily Ovchinnikov: Yes, we are planning to go for. Reservations. Correct. The thing is they're not particularly a super flexible in terms of how you send them either. But again noted If it's not your area that's fine,…
00:30:00
Studio 3 (de-ber-tsky2): Yes.
Vasily Ovchinnikov: there is one thing that an intersection. I also have a question about what I told you about. This whole Tensorflow is a bottleneck and performance through good thing. Yeah, it didn't mean waste comes from Tensorflow data set and the one way we tested, what could work well and what we found was that what works best in terms of thankfully, finally support it, internally is better data format. arrow for that matter. Bigquery cannot export that. So we were finishing building. Now our own thingy. And are there any plans to support more of the Tensorflow?
Studio 3 (de-ber-tsky2): Mm-hmm
Vasily Ovchinnikov: Input options from the BIGQUERY anywhere because that this is infringent between vertex and bigquery. I can't really say where this question. Should rather be directed, probably declared, but Maybe, something that's why I'm asking.
Studio 3 (de-ber-tsky2): I don't know on top of my head but I could research a little bit internally. where we have some plants there or whether we have some connectors or something that make it more compatible.
Vasily Ovchinnikov: Okay, fair enough. As I said, it's like I don't necessarily know where the demarcation lines are drawn, right?
Studio 3 (de-ber-tsky2): just ask your questions. I mean, that's exactly the stuff that we can help because we have access to the internal resources. And we have inside into some of the roadmaps so that's exactly the type of questions that we can definitely help with. Or I can find someone that can help with it. So yeah, yeah. So feather fire for the
Vasily Ovchinnikov: Arrow feather, right? But both ultimately compatible further is more efficient. In terms of model, training specifically, it's declaration of designers for a format that is very quick to read and indeed it is Piping.
Studio 3 (de-ber-tsky2): 
Vasily Ovchinnikov: It in any other way is literally 50 times slower. Which was the number surprised us a little bit.
Vasily Ovchinnikov: But yeah, it's there 30 to 50 times difference in speed and against parkette, as well, which is a in machine learning format, which
Studio 3 (de-ber-tsky2): Yeah, that makes a big difference. Yeah. What?
Vasily Ovchinnikov: Yeah, 3250 is monetarily and especially from workload perspective is night and day really. So yeah.
Studio 3 (de-ber-tsky2): No, so that's 3250 percent. So Feather is …
Vasily Ovchinnikov: That's the thing.
Studio 3 (de-ber-tsky2): so yeah, time sometimes crazy. So it is 50 times faster than ever.
Vasily Ovchinnikov: on every she's 31 to 36, but in some cases it's 50 times quicker than purple cat or,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: or parquet or I don't know, CC is something like some not read optimized format
Studio 3 (de-ber-tsky2): Got it gonna go? Okay, I'll check on that, I'll check on that.
Vasily Ovchinnikov: Yeah, because most skin again, one major part of our cost is obviously decree. Sure, put the second major part is running big fat machines for a long periods of time.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: Sometimes a day and since our scheduler is flow and airflow is notoriously finicky about payloads that run long, it just loses them.
Studio 3 (de-ber-tsky2): 
Vasily Ovchinnikov: Speeding up the training so that it fits a day is a good idea, like a unit of training.
Studio 3 (de-ber-tsky2): Yeah, that's true. 100%. Yeah, yeah, let me know. I'll come back and come back to you in this one. Nice. Yeah,…
Vasily Ovchinnikov: I still have one more question. Probably the last one.
Studio 3 (de-ber-tsky2): please tell me.
Vasily Ovchinnikov: Tensorboard. Is there?
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: honestly, any benefit of using built-in, Tensorboard into vertex I versus hosted instance.
Studio 3 (de-ber-tsky2): To be honest, I am. Under the hood, It's a typical managed open source project, right? So in the end, the functionality is the same.
Studio 3 (de-ber-tsky2): If the integrated and integratedness might be a little bit better.
Studio 3 (de-ber-tsky2): If you find with the maintenance of hosting it yourself, then you don't need to use the managed version if you don't want to bother but hosting it on your own machine or whether you're hosting it, then go for the managed version. that's essentially, either The answer, right? Functionality will be the same.
00:35:00
Vasily Ovchinnikov: Got it. Yeah.
Studio 3 (de-ber-tsky2): Maybe you'll have a nicer integratedness as I mentioned because you just need to pick a couple buttons instead of I don't know authenticating yourself across your environment right. Probably the tensor board is already pre-authenticated and that type of stuff is taking care of for you, But aside from that or no, I don't know if it's had from that but that's the ups and downs. I would say
Vasily Ovchinnikov: You got it? Good I'm asking because there has been a bit of a history of open source, managed project having a little bit of something extra on top of them, to make them more internally manageable or just more attractive in case of Kubernetes set up notoriously out there,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: And I'm was not quite sure whether the TENSORBOARD Maybe one of those.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: If you say that mostly the initial glue code integration that we already have and it's just like a CLI command away for a person and…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: To be completely honest, they prefer sale I commands to clicking the Google interfaces, especially logs and sorry they suck but yeah.
Studio 3 (de-ber-tsky2): Yeah. I mean, I'm gonna also take it away and see if I can find I'm something that I'm missing here, but it's not a heavily turning. Honestly, I think in three years of scene, maybe three of all kinds doing manage tensorboard. So not many.
Vasily Ovchinnikov: Mmm.
Studio 3 (de-ber-tsky2): Yeah, it's a nice to have if you want to have an easy life, if you're fine with hosting it yourself and you prefer it even fantastic. That's I can say anything there. I'll double check. If I'm missing anything in terms of functionality here, but no, yeah, not that, I'm thinking not anything that I can think of on top, right.
Vasily Ovchinnikov: got it. Okay. Then it sounds like what I had immediately prepared. We got covered
Vasily Ovchinnikov: There is. An adjacent team in our company that is trying to do stuff with generative AI. That is not my team and…
Studio 3 (de-ber-tsky2): First.
Vasily Ovchinnikov: I'm not quite old retro 11. That I don't quite necessarily know what they're doing and in detail what they're aiming to do. I did tell them about them maybe establishing a connection so they may reach out on that particular topics specifically.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: but yeah, from the standpoint, where of my team, it's Not really a context like I'm not really an issue, those models to begin with that way too slow to using that mainstream at space. The hundred milliseconds, leave the no chance.
Studio 3 (de-ber-tsky2): Family. And sounds good. If you can make the connection there, fantastic. If they also want to chat, if you would like to chat more about some of these topics, if you want to take deeper, look more detailed look in the spot is Yeah.
Vasily Ovchinnikov: I have a commission that I completely forgot about Collabs.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: We used to have a need for dedicated data science environment, because rare and CPUs. Right now all of them are sitting on rather beefy M3 Max. So most of the stuff they do, they can do just locally and they obviously prefer that but some of the stuff still't Collab. As a separate engine Has a weird history, I would say. I'm not quite sure where it sits right now. Used to be promoted, then it got lost all the machine access then and get back. So There is this button about collapse. What is this about? Can we leverage it somehow to give the data scientists on demand preset up environments? I don't know dependencies and style and such what the goal there was the strategy there.
Studio 3 (de-ber-tsky2): the two major options to using YouTube Channel Books in Vertex. One is the vertex book bench and one is called Enterprise.
Studio 3 (de-ber-tsky2): I mean, collab in general, it's called up. The idea is to have this easily shareable, Jupiter notebooks that in the public version. They also have what they run on three infrastructure, right? So you can even have a GPU for free more or…
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): less, right? The catch with the public call up is the resources are not sure, So if GCP needs to resources, they're going to put it away from the public Co-op coops. And there's a call a plus kind of thing, I think, as well, not 100% sure. But yeah, It's a major story. Caught up. Enterprise is exactly the same thing. Just that if you run call apps within Vertex, you have a short resources. So obviously, you pay for the resources that you're running on, but that also means your shorts. they're not gonna be pulled away from your notebook. If you're training something or you're wanting something there, that's it.
00:40:00
Vasily Ovchinnikov: Okay.
Studio 3 (de-ber-tsky2): That's a long story short and call up Enterprise
Studio 3 (de-ber-tsky2): Vertex workbench Jupiter, lab is not cola, but it's Jup the lab. So it's a native Jupiter environment.
Studio 3 (de-ber-tsky2): personally, if I work with notebooks, which doesn't happen so often, but if I work with notebooks, I work on Jupiter Vertex workbench because I personally find that nicest and easiest and most well, integrated into the rest of shoes, gcp as well. You basically spin up an instance, you have a auto shut down. So someone. So, basically, if it's tentative, it's gonna be shut down after three hours or something, and you have a very nice integrated environment directly can access your Bigquery, directly can access all the other APIs. You don't have to authenticate with call up. You still have to do the
Studio 3 (de-ber-tsky2): BBC setup and the subnet setup and so on it's a bit more tricky In the beginning, I didn't find it.
Vasily Ovchinnikov: Yep.
Studio 3 (de-ber-tsky2): So intuitive to start working with it vertex work expansion. The other hand, I personally love for experimentation and super nice.
Vasily Ovchinnikov: So it is a Jupiter lab, right? We had one hosted, thankfully not anymore,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: but from that experience,
Vasily Ovchinnikov: I learned having to maintain that and maintenance that. It is highly customizable and much like Jupiter itself,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: but Lab just is more flexible in this regarding handsome. So all sorts of injection. Call Up is not a standard What about the World Bench how highly not standard Jupiter lab that is and Following up. If we wanted to install an extension to that could be
Studio 3 (de-ber-tsky2): So, vertex workbench has right now. So three operating options. I mean, you simply completely ignore managed notebooks and the third one, you forgot, many notebooks. Summer managed or
Studio 3 (de-ber-tsky2): So no have managed notebooks and instances. You can basically completely managed notebooks and…
Vasily Ovchinnikov: Yes.
Studio 3 (de-ber-tsky2): self-managed notebooks because They're anyways sunseted. I believe interesting is vertex workbench instances…
Vasily Ovchinnikov: .
Studio 3 (de-ber-tsky2): because instances gives you the sweet spot of completely managed Jupiter lab and unmanageable lab because you don't have to host it yourself but you can still access the machine underneath so can do any tricks that you want with it but it's completely managed for you.
Vasily Ovchinnikov: I see.
Studio 3 (de-ber-tsky2): So if you spin it up, you spin it up Automatically. The machine is running. You can access it in GCE. If you don't use it or You turn off the machine basically. So that's the sweet spot between both worlds. I'd recommend if you go for workbench, Always go for instance, everything else. That's basically because it only has upsides. Yeah.
Vasily Ovchinnikov: Fair enough.
Studio 3 (de-ber-tsky2): For It's a very nice tool if I really want the notebook, I usually spin up one of these. you have the entire lap interface? So you don't just have notebook by notebook bases, But you can actually store mode but notebooks, you can also make it accessible across users in one project which also nice. And As I mentioned you can access the machine underneath. So either through the Jupiter Develop interface,
Vasily Ovchinnikov: Yep.
Studio 3 (de-ber-tsky2): you can access the terminal on install whatever you want to install or you can access the underlying machine and there you can obviously do anything that you want, And it's like a GCE instance that you're hosting yourself. Just Yeah, it's automatically set up with the image on Jupiter app, I guess. Yeah.
Vasily Ovchinnikov: God, it's important question to that. That's not actually pretty fun. And interesting, The important question is obviously the link. So we would be assuming it's a hosted instance.
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: We would be paying, for instance, that's the given. What else did you? Really.
Studio 3 (de-ber-tsky2): That's it. The instance in the volume Incident woman. You touch the volume attached. Yeah. so,…
00:45:00
Vasily Ovchinnikov: Okay.
Studio 3 (de-ber-tsky2): depending on the resource that you put in there, And any volume that you attach. So it's really the infrastructure, that's it.
Vasily Ovchinnikov: Got it. And is there any way to specify Put the lack of better comparison, If you go to AWS and specify an AWS machine, they have a prologue script that you can put in and it will install whatever you please on there. They have some special name for that. I don't really remember.
Studio 3 (de-ber-tsky2): Startup strip club.
Vasily Ovchinnikov: You need beside the point. something like not immediately obvious name but essentially could put a shell script there and it will do whatever you please with the machine.
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: Could something similar be done to instances that has been spun up for Jupiter, example being right? I told you. We have this old libraries and tool toolkit for tracking. Versioning and so forth. I don't if we wanted all our environments to have that be installed, is there. Another means to do that in some ways.
Studio 3 (de-ber-tsky2): Startup script, I'm I can't imagine that. You can assign it because you can send Fuji CE instances So I assume that I'm not happy sure I would have to check…
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): but I'm pretty confident that you can. Pointed towards. And container or…
Vasily Ovchinnikov: Architecture.
Studio 3 (de-ber-tsky2): something. I'm pretty confident that you have options to customize the environment. I would have to check which one it is, but it's a startup script or whether it's a container build or something that you pointed towards. 100% Sure. But I can also take this as a follow-up. Yeah.
Vasily Ovchinnikov: Yeah, because this problem while not immediately as glaring as it used to be with more beefy, local machines, it's still there. It's still sometimes a terabyte of data she's by no means is really convenient to wrangle on local machines, not everybody has I mean very Germany look our Internet, here's so
Studio 3 (de-ber-tsky2): I know I understand I understand and this makes it make a lot of sense. And since he said You're working with the query without this quite nice because the instances are super well integrated there as well. They basically have these, how's it called the Ipython cells Magic Python or…
Vasily Ovchinnikov: You felt types.
Studio 3 (de-ber-tsky2): something the direct bigquery action so you can directly write big cruise sequel into a cell and you directly get it's pretty cool.
Vasily Ovchinnikov: That sounds pretty cool indeed. Yeah. Yeah,…
Studio 3 (de-ber-tsky2): It works, right? Let me just share my screen. Briefly.
Vasily Ovchinnikov: it actually sounds pretty decent, because for Call-up, we have some glue scripts, or they use our libraries that also have and bigquery access where they can just post a query. Particularly is integrated in that
Studio 3 (de-ber-tsky2): It is. So I'm just starting this one and gonna take a minute or two. So, this is vertex workbench right now. Here, you use a manager.
Vasily Ovchinnikov: sir.
Studio 3 (de-ber-tsky2): You can manage these ones, you can completely ignore. Just go for instance, then if a credit union I already just checked. and you can go to Advanced options. So then you have essentially all the options that you get, you have for creating a virtual machine and environment, you can also have your startup script. I know that's post startup script.
Vasily Ovchinnikov: Here we go again. I don't know if it starts and launches and install something, it's really like Buying.
Studio 3 (de-ber-tsky2): And you can do both. That's what I mentioned. You can also point it to a custom container. So if you have a controlled basically,…
Vasily Ovchinnikov: Mmm.
Studio 3 (de-ber-tsky2): then you can point it here to your doctor image.
Vasily Ovchinnikov: That will have to have do derived from Europe, guys, image. Basically just put some customizations are top. Okay.
Studio 3 (de-ber-tsky2): Yeah, and I mean you have all this and then let me just see if I can briefly show you the ayah. It's already spun up. I'm just gonna briefly show you the bigquery integration because this really quite sweet. It's a nice thing to show.
Vasily Ovchinnikov: neo4j. Sorry, for being personally around. DB is highly preferred. Actually
Studio 3 (de-ber-tsky2): Yeah, we can discuss on this one. I'm working right now, on the detailed benchmark on knowledge crafts. And why you shouldn't use graph databases at all, but just stay the model with the sequel database.
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): Nice.
Vasily Ovchinnikov: Yeah, Fair enough.
Vasily Ovchinnikov: The most definitely not neo4j and lately not quite around either, but they're using rocks DB engine underneath anymore.
00:50:00
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: So, No difference with manga, ultimately.
Studio 3 (de-ber-tsky2): that's exactly. I thought. Anyways, for Bigquery so if you just have an empty one, you can just go into basically bigquery and Let me just see if I have some data in this project.
Studio 3 (de-ber-tsky2): I know, that's
Vasily Ovchinnikov: But while you're searching on grab the database is one thing that still makes around with it. Stand out is magnificent aql language.
Studio 3 (de-ber-tsky2): Aql.
Vasily Ovchinnikov: That. They have their own flavor of query language,…
Studio 3 (de-ber-tsky2): Yeah. Yeah.
Vasily Ovchinnikov: which is very, very powerful and very nice to use
Studio 3 (de-ber-tsky2): And it's great and neo4j has cypher as well, right? and if you want to do really detailed graph analysis, that's also good. But the question is, whether for most applications, you really need that, right? And I don't think
Vasily Ovchinnikov: No, no, yeah. If you're really,…
Studio 3 (de-ber-tsky2): so, You really want to learn a completely different query language,…
Vasily Ovchinnikov: don't. So I saw that.
Studio 3 (de-ber-tsky2): just for the sake of doing something simple. I don't know. maybe for some of the cases.
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): Obviously, it's nice.
Vasily Ovchinnikov: Yeah. Agreed.
Studio 3 (de-ber-tsky2): So, I
Vasily Ovchinnikov: Especially in neo4j language is Complicated, let's call this way. This is…
Studio 3 (de-ber-tsky2): Exactly.
Vasily Ovchinnikov: why I personally prefer the psychicl because it is Easily teachable to a person could never operated grab that amazes to begin with.
Studio 3 (de-ber-tsky2): Yeah, I have to take a look,…
Vasily Ovchinnikov: It's big.
Studio 3 (de-ber-tsky2): I've just looked at Cypress apart.
Vasily Ovchinnikov: Okay, so it doesn't hear the scheme of Bigquery, Or two does doesn't have permissions,…
Studio 3 (de-ber-tsky2): Should exactly.
Vasily Ovchinnikov: fair enough.
Studio 3 (de-ber-tsky2): I have a permissions issue and I don't know why. It's a bit weird. Usually, these should be automatically authenticated. but okay, that's a shame.
Vasily Ovchinnikov: So they're made as long as they are probably.
Studio 3 (de-ber-tsky2): It's a bit weird.
Vasily Ovchinnikov: Maybe there are some user under which the machine spawn as the different one from the one that Bigquery used.
Studio 3 (de-ber-tsky2): In any case. That would be if anything open here. Probably not. In any case, this would be how you work with it. So you
Studio 3 (de-ber-tsky2): So, you basically,
Studio 3 (de-ber-tsky2): No. And anyways,…
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): and this is how you work with it and it works quite nicely because then it gives you the Data explorer right away in Jubile notebook and you can basically press Turn into Data frame and it turns it into a panda's data frame right away. So do I see generates you the code to extract it into panastatinum. So this is quite nice,
Vasily Ovchinnikov: Got it.
Studio 3 (de-ber-tsky2): just a mimic, Just wanted to show you this one.
Vasily Ovchinnikov: We will definitely try that. not definitely, but very likely to find that just to keep the needs of the data centers for a bigger machines.
Studio 3 (de-ber-tsky2): Yep.
Vasily Ovchinnikov: Since they already familiar and mostly comfortable with vertex that starts from the same place and has the same machine types. And the network is still an open question because I saw there was a network app and in the instances and we And somewhat of not a unique but extra requirements to that, in a sense that we have a megaport integration with our own infrastructure. So that there is direct access. And for that, obviously, there are network requirements to be part of particular VPC setups. for airflow for the managers, for the vertex machines that Not a problem because what runs on them normally doesn't need access to anything enter. It's just trainings. They are producing something that's consumed by eternal.
Vasily Ovchinnikov: For management systems the date get data because they can't theoretically get it from internal sources. They have to be connected and they're running in a composer cluster and a separate Kubernetes that are connected to statically. Allocated vpcs. With Jupiter notebooks. They might need to do that as well. When it spins the machine up, it spins it in somewhere, That not necessarily control but we can specify it. It's a vapi to you.
Studio 3 (de-ber-tsky2): Yeah yeah for the instances here so you can define…
00:55:00
Vasily Ovchinnikov: Okay.
Studio 3 (de-ber-tsky2): which VPC to create it for sure. Yeah.
Vasily Ovchinnikov: All right, Then that's it from us. I thank you very much for the questions.
Studio 3 (de-ber-tsky2): that's,
Studio 3 (de-ber-tsky2): Yeah, no, It's really nice chatting. I would love to follow up on some of these things as well. You and Berlin, right? Perfect.
Vasily Ovchinnikov: I am. Yes. technically post them but close enough. Yes.
Studio 3 (de-ber-tsky2): Because I do have in just to give you some context the initial reason why I reach houses. Obviously, I'm trying to work more with our customers in the region, And I saw you in there so generally keeping us a resource, So if you have any questions on demand for free to, just send me should be an email. If you at some point need some, I'm super flexible in the format we can work together, So, if you want to, I don't know, just on demand, shoot over some questions, happy to help as far as I can, if you want to set up a bigger workshop for anything, if you have a new
Studio 3 (de-ber-tsky2): Project Coming Up. If you want to validate some best practices that you're following or not, feel free to just tell me and we can also set up a bigger workshop with your video engineering team or whatever, Really just know…
Vasily Ovchinnikov: Yep.
Studio 3 (de-ber-tsky2): how we can help and we can try to make it possible. Also, in really looking at your specific cases, super hands-on. So no problem and
Vasily Ovchinnikov: Sounds awesome. Sounds awesome.
Studio 3 (de-ber-tsky2): Last thing is, I have a cool event coming up. That might be interesting for you. So this is actually quite special. We're gonna have two product managers coming to in the month. One of them is a vertex product manager, and one of them is or they're both vertex in Gemini, product basically product. Managers means it's quite a special occasion because they're based in the US pretty much All the AI platform product managers, from Google Side are based in the US, unfortunately, and that makes them usually quite hard to access for us,…
Vasily Ovchinnikov: Thanks. Fair enough.
Studio 3 (de-ber-tsky2): as well as, for our customers, Which is they're the ones that actually drive the drive,…
Vasily Ovchinnikov: Fair enough.
Studio 3 (de-ber-tsky2): the world map side and drive, what's the strategy of the product and they're collecting feedback and so on. So now we have the cool opportunity that they're going to come to Berlin for a day.
Vasily Ovchinnikov: Okay.
Studio 3 (de-ber-tsky2): Mid and October. And if you want I will love you. To also come by. We have Round Table for some of our customers planned on October 23rd from 4pm to 6 pm. We'll be a nice opportunity just for you to ask some questions that you want to ask to clarify.
Vasily Ovchinnikov: Yeah.
Studio 3 (de-ber-tsky2): Really the most specific questions on vertex in Germany that you have in the world, they're the ones to ask them and also would be the poor, the best place to basically give feedback because they're the ones that actually drive the world map. So literally the best person you can feed back to. That's what we need. Please portion that direction. So, if you have time or maybe you and someone from the team that works more with generative, AI has time would love to have both of you or someone from their team there.
Vasily Ovchinnikov: That sounds pretty good. Yeah. So it's 23rd of October. if you by chance, could sell it in an email. So they would be able to share easily…
Studio 3 (de-ber-tsky2): just,
Vasily Ovchinnikov: because yeah, I would imagine they Would be interested. at least that sounds pretty hands-on kind of thing that they would really love to participate in. And yeah,…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: I don't,…
Studio 3 (de-ber-tsky2): 
Vasily Ovchinnikov: I sincerely don't know whether they tried to use Gemini. I Am not probably generally or…
Studio 3 (de-ber-tsky2): Yeah.
Vasily Ovchinnikov: context separation deliberately try not to go too deep into that particular rabbit hole…
Studio 3 (de-ber-tsky2): I know. Yeah. that's,…
Vasily Ovchinnikov: because it has a little bit different set of requirements. A little bit different business thing and…
Vasily Ovchinnikov: we don't host it tldr.
Studio 3 (de-ber-tsky2): Yeah, that's completely fine…
Studio 3 (de-ber-tsky2): because we have, I mean their vertex and Gemini product managers. So all these questions you can also go ask them and they'll also focusing obviously this day a lot of Gemini, right? Because just part of the entire story. So if you want a reserve two spots for you it's quite limited in terms of space. So you would have to tell me as soon as possible.
Vasily Ovchinnikov: Yeah. Yep.
Studio 3 (de-ber-tsky2): Yeah. If you want to save you two spots, one or…
Vasily Ovchinnikov: Yeah. …
Studio 3 (de-ber-tsky2): two spots depending on,
Vasily Ovchinnikov: that would be lovely. I definitely do have time this time to join for the other person. I would need to share that with them and ask them.
01:00:00
Studio 3 (de-ber-tsky2): We have to leave the room now, but I'll send you a follow-up and then we can discuss the recipe. Best meeting you actually.
Vasily Ovchinnikov: Thank you very much for your time and answers.
Meeting ended after 01:00:33 👋
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.

Major GCP specific Technical questions: description: What are the recommended GPU options for training models that are not large foundational models, and how do they compare in terms of performance and cost?
description: Is there a throughput benefit to using Vertex AI Datasets compared to directly accessing data in BigQuery, especially for time-series data?
description: Are there plans to support more input formats, such as Arrow/Feather, for TensorFlow data loading from BigQuery?
description: What are the benefits of using the managed TensorBoard in Vertex AI versus hosting a TensorBoard instance ourselves?
description: What are the options for setting up a dedicated data science environment with pre-installed dependencies using Vertex AI Workbench or Colab Enterprise?
description: Can we use a startup script or a custom container image when creating Vertex AI Workbench instances to customize the environment?
description: How can we specify which VPC to use when creating Vertex AI Workbench instances, especially for connecting to on-premises infrastructure via Megaport?

    Transcript to Analyze: 
    {transcript}

    Tasks (JSON array):`,
    inputVariables: ["transcript"],
  }),

  research: new PromptTemplate({
    template: `
    Research the following technical task using the provided Google Cloud documentation context.
    
    Task: {task}
    
    Provide a response that:
    1. Clearly answers the technical question
    2. Includes specific steps or configurations where relevant
    3. Notes any important caveats or best practices
    4. References specific sections of the documentation
    
    {format_instructions}
    
    Technical Response:`,
    inputVariables: ["task", "format_instructions"],
  }),

  emailGeneration: new PromptTemplate({
    template: `Generate a professional follow-up email to the customer based on the technical research results.
    
    Original Tasks:
    {tasks}
    
    Research Findings:
    {research}
    
    Documentation References:
    {docLinks}
    
    Requirements for the email:
    1. Start with a brief meeting reference and summary
    2. Address each technical question comprehensively
    3. Include relevant code snippets or commands where helpful
    4. Link to specific documentation sections for each answer
    5. Maintain a professional but friendly tone
    6. End with next steps or an offer for further clarification
    
    Generated Email:`,
    inputVariables: ["tasks", "research", "docLinks"],
  }),
};

// Output parsers for structured responses
export const outputParserPrompts = {
  tasks: `The output should be a valid JSON array following this structure:
  [
    {
      "description": "string",
    }
  ]`,
  research: `The output should be a valid JSON object following this structure:
  {
    "answer": "string",
    "steps": string[],
    "caveats": string[],
    "docReferences": { "title": "string", "url": "string" }[]
  }`,
};